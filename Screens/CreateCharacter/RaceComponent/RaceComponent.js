import React, { useState, useEffect } from "react";

import {
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import LoadingGetServer from "../../../Shared/LoadingGetServer";
import ModalHelp from "../../../Shared/modalHelp";

const RaceComponent = ({ darkMode, race, setRace, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [races, setRaces] = useState([]);
  const [raceDetails, setRaceDetails] = useState();

  const [proficiencieOptionsArray, setProficiencieOptionsArray] = useState([]);
  const [languageOptionsArray, setLanguageOptionsArray] = useState([]);
  const [abilityOptionsArray, setAbilityOptionArray] = useState([]);

  useEffect(() => {
    const getRaces = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/races");
        const results = response.data.results;

        const copy = [];

        results.map((result) => {
          copy.push(result.name);
        });

        setRaces(copy);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    getRaces();
  }, []);

  const getRaceFeatures = async (selectedClasse) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const url_api = `https://www.dnd5eapi.co/api/races/${selectedClasse.toLowerCase()}`;

      const response = await axios.get(url_api);

      setRaceDetails(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <View>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
        {errorMessage}
      </Text>
      <LoadingGetServer />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Button
        title="console"
        onPress={() => {
          // console.log(navigation);
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
          {errorMessage}
        </Text>

        <View
          style={[
            darkMode ? themeStyle.dark.container : themeStyle.light.container,
            { borderColor: "red", borderWidth: 0, alignItems: "center" },
          ]}>
          <Text
            style={[
              darkMode ? themeStyle.dark.text : themeStyle.light.text,

              { fontWeight: "bold", fontSize: 20, textAlign: "center" },
            ]}>
            Choisis la race de ton personnage
          </Text>

          <SelectDropdown
            buttonStyle={{
              marginTop: Dimensions.get("screen").height / 50,
            }}
            data={races}
            onSelect={(selectedItem, index) => {
              setRace(selectedItem);
              getRaceFeatures(selectedItem);
            }}
            defaultButtonText={race ? race : null}
          />
        </View>
        {raceDetails && (
          <View
            style={[
              darkMode ? themeStyle.dark.container : themeStyle.light.container,
              // { borderColor: "red", borderWidth: 2 },
            ]}>
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,

                  themeStyle.title,
                ]}>
                Informations Générales
              </Text>
              {/* <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              {raceDetails.name}
            </Text> */}

              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                Vitesse : {raceDetails.speed}
              </Text>

              <View>
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  age :{" "}
                </Text>

                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {raceDetails.age}
                </Text>

                <View>
                  <Text
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
                    taille : {raceDetails.size}
                  </Text>

                  <Text
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
                    {raceDetails.size_description}
                  </Text>
                </View>

                <View>
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      themeStyle.title,
                    ]}>
                    Langues
                  </Text>

                  {raceDetails.languages &&
                    raceDetails.languages.map((langue, index) => {
                      return (
                        <Text
                          style={
                            darkMode
                              ? themeStyle.dark.text
                              : themeStyle.light.text
                          }>
                          {langue.name}
                        </Text>
                      );
                    })}

                  {raceDetails.language_options ? (
                    <View
                      style={{
                        alignItems: "center",
                        paddingHorizontal: 3,
                      }}>
                      <Text
                        style={[
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text,
                          themeStyle.title,
                        ]}>
                        {`Choisir ${raceDetails.language_options.choose} ${
                          raceDetails.language_options.choose > 1
                            ? " langues supplémentaires"
                            : " langue supplémentaire"
                        }`}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}>
                        {languageOptionsArray &&
                          languageOptionsArray.map((item, index) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  const copyLanguageOptions = [
                                    ...languageOptionsArray,
                                  ];
                                  copyLanguageOptions.splice(index, 1);
                                  setLanguageOptionsArray(copyLanguageOptions);

                                  raceDetails.language_options.from.push(item);
                                }}>
                                <Text
                                  style={[
                                    darkMode
                                      ? themeStyle.dark.text
                                      : themeStyle.light.text,
                                  ]}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                          alignItems: "center",
                          paddingHorizontal: 3,
                        }}>
                        {raceDetails.language_options.from
                          .sort((a, b) => {
                            let fa = a.index;
                            let fb = b.index;

                            if (fa < fb) {
                              return -1;
                            }
                            if (fa > fb) {
                              return 1;
                            }
                            return 0;
                          })
                          .map((language, index) => {
                            return (
                              <TouchableOpacity
                                style={{
                                  width: "35%",
                                  borderColor: "white",
                                  borderWidth: 1,
                                  backgroundColor: themeStyle.blueColor,
                                  padding: 3,
                                  borderRadius: 5,
                                  margin: 5,
                                }}
                                key={index}
                                onPress={() => {
                                  const copyLanguageOptions = [
                                    ...languageOptionsArray,
                                  ];

                                  if (
                                    languageOptionsArray.length <
                                    raceDetails.language_options.choose
                                  ) {
                                    copyLanguageOptions.push(language);

                                    raceDetails.language_options.from.splice(
                                      index,
                                      1
                                    );

                                    setLanguageOptionsArray(
                                      copyLanguageOptions
                                    );
                                  } else {
                                    setErrorMessage(
                                      "Vous avez déja atteint le nombre maximum d'option(s) supplémentaire(s) autorisé(s)"
                                    );
                                  }
                                }}>
                                <Text
                                  style={[
                                    darkMode
                                      ? themeStyle.dark.text
                                      : themeStyle.light.text,
                                    { textAlign: "center" },
                                  ]}>
                                  {language.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                      </View>
                    </View>
                  ) : null}
                  <Text
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
                    {raceDetails.language_desc}
                  </Text>
                </View>

                <View>
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      themeStyle.title,
                    ]}>
                    Traits
                  </Text>

                  {raceDetails.traits &&
                    raceDetails.traits.map((trait, index) => {
                      return (
                        <Text
                          style={
                            darkMode
                              ? themeStyle.dark.text
                              : themeStyle.light.text
                          }>
                          {trait.name}
                        </Text>
                      );
                    })}
                </View>
              </View>
            </View>

            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Alignement :{" "}
              </Text>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {raceDetails.alignment}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Bonus de Race :
              </Text>
              {raceDetails.ability_bonuses &&
                raceDetails.ability_bonuses.map((bonus, index) => {
                  return (
                    <View key={index}>
                      <Text
                        style={
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text
                        }>
                        caractéristique : {bonus.ability_score.name}
                      </Text>

                      <Text
                        style={
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text
                        }>
                        bonus : + {bonus.bonus}
                      </Text>
                    </View>
                  );
                })}
              <View>
                {raceDetails.ability_bonus_options ? (
                  <View style={{ flexGrow: 1 }}>
                    <Text
                      style={[
                        darkMode ? themeStyle.dark.text : themeStyle.light.text,
                        themeStyle.title,
                      ]}>
                      Choisir {raceDetails.ability_bonus_options.choose}
                      {raceDetails.ability_bonus_options.choose > 1
                        ? " bonus supplémentaires"
                        : " bonus supplémentaire"}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}>
                      {abilityOptionsArray &&
                        abilityOptionsArray.map((item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                const copyAbilityOptionsArray = [
                                  ...abilityOptionsArray,
                                ];
                                copyAbilityOptionsArray.splice(index, 1);

                                setAbilityOptionArray(copyAbilityOptionsArray);

                                raceDetails.ability_bonus_options.from.push(
                                  item
                                );
                              }}>
                              <Text
                                style={[
                                  darkMode
                                    ? themeStyle.dark.text
                                    : themeStyle.light.text,
                                ]}>
                                {`${item.ability_score.name}  +${item.bonus}`}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}>
                      {raceDetails.ability_bonus_options.from
                        .sort((a, b) => {
                          let fa = a.ability_score.index;
                          let fb = b.ability_score.index;

                          if (fa < fb) {
                            return -1;
                          }
                          if (fa > fb) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((bonus, index) => {
                          return (
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // paddingHorizontal: 3,
                                margin: 5,
                              }}
                              key={index}
                              onPress={() => {
                                const copyAbilityOptionsArray = [
                                  ...abilityOptionsArray,
                                ];

                                if (
                                  abilityOptionsArray.length <
                                  raceDetails.ability_bonus_options.choose
                                ) {
                                  copyAbilityOptionsArray.push(bonus);

                                  raceDetails.ability_bonus_options.from.splice(
                                    index,
                                    1
                                  );

                                  setAbilityOptionArray(
                                    copyAbilityOptionsArray
                                  );
                                } else {
                                  setErrorMessage(
                                    "Vous avez déja atteint le nombre maximum d'option(s) supplémentaire(s) autorisé(s)"
                                  );
                                }
                              }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}>
                                <Text
                                  style={
                                    darkMode
                                      ? themeStyle.dark.text
                                      : themeStyle.light.text
                                  }>
                                  {bonus.ability_score.name}
                                </Text>

                                <Text
                                  style={
                                    darkMode
                                      ? themeStyle.dark.text
                                      : themeStyle.light.text
                                  }>
                                  {`Bonus + ${bonus.bonus}`}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>

            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Maitrise Equipements :
              </Text>
              {raceDetails.starting_proficiencies &&
                raceDetails.starting_proficiencies.map(
                  (proficiencie, index) => {
                    return (
                      <View key={index}>
                        <Text
                          style={
                            darkMode
                              ? themeStyle.dark.text
                              : themeStyle.light.text
                          }>
                          {proficiencie.name}
                        </Text>
                      </View>
                    );
                  }
                )}
              {raceDetails.starting_proficiency_options ? (
                <View style={{ flexGrow: 1 }}>
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      themeStyle.title,
                    ]}>
                    Choisir {raceDetails.starting_proficiency_options.choose}
                    {raceDetails.starting_proficiency_options.choose > 1
                      ? " maîtrises supplémentaires"
                      : " maîtrise supplémentaire"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}>
                    {proficiencieOptionsArray &&
                      proficiencieOptionsArray.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setErrorMessage("");
                              const copyProficiencieOptions = [
                                ...proficiencieOptionsArray,
                              ];

                              copyProficiencieOptions.splice(index, 1);

                              raceDetails.starting_proficiency_options.from.push(
                                item
                              );

                              setProficiencieOptionsArray(
                                copyProficiencieOptions
                              );
                            }}>
                            <Text
                              style={
                                darkMode
                                  ? themeStyle.dark.text
                                  : themeStyle.light.text
                              }>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>

                  {raceDetails.starting_proficiency_options.from
                    .sort((a, b) => {
                      let fa = a.index;
                      let fb = b.index;

                      if (fa < fb) {
                        return -1;
                      }
                      if (fa > fb) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((proficiencie, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 3,
                          }}
                          key={index}
                          onPress={() => {
                            const copyProficiencieOptions = [
                              ...proficiencieOptionsArray,
                            ];

                            if (
                              proficiencieOptionsArray.length <
                              raceDetails.starting_proficiency_options.choose
                            ) {
                              copyProficiencieOptions.push(proficiencie);

                              raceDetails.starting_proficiency_options.from.splice(
                                index,
                                1
                              );

                              setProficiencieOptionsArray(
                                copyProficiencieOptions
                              );
                            } else {
                              setErrorMessage(
                                "Vous avez déja atteint le nombre maximum d'option(s) supplémentaire(s) autorisé(s)"
                              );
                            }
                          }}>
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.text
                            }>
                            {proficiencie.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Help", {
                                url_api: proficiencie.url,
                              });
                            }}>
                            <Text
                              style={
                                darkMode
                                  ? themeStyle.dark.text
                                  : themeStyle.light.text
                              }>
                              En savoir plus
                            </Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              ) : null}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,

    // borderWidth: 3,
    // borderColor: "red",
  },
});

export default RaceComponent;
