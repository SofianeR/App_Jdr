import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

import LoadingComponent from "../../Shared/LoadingComponent";

const ClassComponent = ({ setClasse, classe, darkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [classes, setClasses] = useState([]);

  const [classeDetails, setClasseDetails] = useState();

  const [bonusMaitrise, setBonusMaitrise] = useState([]);

  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    const getClass = async () => {
      setErrorMessage("");
      setIsLoading(true);
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/classes");

        const results = response.data.results;

        const arrayClass = [];

        results.map((result) => {
          arrayClass.push(result.name);
        });
        setClasses(arrayClass);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    getClass();
  }, []);

  const getClassFeatures = async (selectedClasse) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const url_api = `https://www.dnd5eapi.co/api/classes/${selectedClasse.toLowerCase()}`;

      const response = await axios.get(url_api);

      setClasseDetails(response.data);

      const copyEquipements = [];

      response.data.starting_equipment.map((item) => {
        copyEquipements.push({
          name: item.equipment.name,
          quantity: item.quantity,
        });
      });
      setEquipements(copyEquipements);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <Button
        title="Console"
        onPress={() => {
          //   console.log(equipements);
          //   console.log(bonusMaitrise, bonusMaitrise.length);
        }}
      />
      {errorMessage ? (
        <View>
          <Text
            style={{ color: "#FF7B6F", textAlign: "center", marginBottom: 10 }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
          choisis la classe de ton personnage
        </Text>

        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
          }}
          data={classes}
          onSelect={(selectedItem, index) => {
            setClasse(selectedItem);
            getClassFeatures(selectedItem);
          }}
          defaultButtonText={classe ? classe : null}
        />

        {classeDetails && (
          <View style={styles.containerClassFeatures}>
            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              Dé de Vie : {classeDetails.hit_die}
            </Text>

            <Text
              style={[
                darkMode ? themeStyle.dark.text : themeStyle.light.text,
                { marginBottom: 5 },
              ]}>
              Maîtrises des armes et armures :
            </Text>

            <View style={styles.proficienciesContainer}>
              {classeDetails.proficiencies.map((item, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={
                        darkMode ? themeStyle.dark.text : themeStyle.light.text
                      }>
                      {item.name}
                      {index < classeDetails.proficiencies.length - 1 && ","}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 10 }}>
              {classeDetails.proficiency_choices.map((item) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginBottom: 10,
                      }}>
                      {bonusMaitrise.length > 0 &&
                        bonusMaitrise.map((selectedBonus, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setErrorMessage("");
                                const copyBonusMaitrise = [...bonusMaitrise];
                                copyBonusMaitrise.splice(index, 1);
                                setBonusMaitrise(copyBonusMaitrise);
                              }}>
                              <Text
                                key={index}
                                style={
                                  darkMode
                                    ? themeStyle.dark.text
                                    : themeStyle.light.text
                                }>
                                {selectedBonus}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>

                    <Text
                      style={
                        darkMode ? themeStyle.dark.text : themeStyle.light.text
                      }>
                      Choisissez {item.choose} bonus de maîtrise de la liste
                      suivante
                    </Text>

                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      {item.from.map((bonus, index) => {
                        return (
                          <TouchableOpacity
                            style={{ marginTop: 5 }}
                            onPress={() => {
                              if (bonusMaitrise.indexOf() === "-1") {
                                console.log("pas trouvé");
                              } else {
                                console.log("trouvé");
                              }
                              if (bonusMaitrise.length < item.choose) {
                                const copyBonusMaitrise = [...bonusMaitrise];
                                copyBonusMaitrise.push(bonus.name);

                                setBonusMaitrise(copyBonusMaitrise);
                              } else {
                                setErrorMessage(
                                  "Vous avez atteint le nombre maximum de bonus autorisés"
                                );
                              }
                            }}>
                            <Text
                              style={[
                                darkMode
                                  ? themeStyle.dark.text
                                  : themeStyle.light.text,
                                ,
                              ]}>
                              {bonus.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
            <View>
              {classeDetails.starting_equipment_options.map((item, index) => {
                return (
                  <View>
                    <Text
                      style={
                        darkMode ? themeStyle.dark.text : themeStyle.light.text
                      }>
                      Choisissez {item.choose} element(s) de la liste suivante
                    </Text>
                    <View>
                      {item.from.map((equipmentItem, index) => {
                        const keys = Object.keys(equipmentItem);
                        console.log(equipmentItem[keys[0]]);

                        return (
                          <TouchableOpacity key={index}>
                            <Text
                              style={
                                darkMode
                                  ? themeStyle.dark.text
                                  : themeStyle.light.text
                              }>
                              {keys[0] === "equipment"
                                ? equipmentItem[keys[0]].name
                                : keys[0] !== "equipment_option"
                                ? equipmentItem[keys[0]].equipment.name
                                : null}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
    // borderWidth: 3,
    // borderColor: "red",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerClassFeatures: {
    marginTop: 10,
    // width: Dimensions.get("screen").width,
    // paddingHorizontal: Dimensions.get("screen").width / 30,
  },
  proficienciesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default ClassComponent;
