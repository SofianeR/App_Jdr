import React, { useState, useEffect } from "react";

import {
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import LoadingComponent from "../../Shared/LoadingComponent";

const RaceComponent = ({ darkMode, race, setRace }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [races, setRaces] = useState([]);
  const [raceDetails, setRaceDetails] = useState();

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

      console.log(url_api);
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
      <LoadingComponent />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
          {errorMessage}
        </Text>

        <View
          style={[
            darkMode ? themeStyle.dark.container : themeStyle.light.container,
            { borderColor: "red", borderWidth: 2 },
          ]}>
          <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
            Choisis la race de ton personnage.
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
          // style={[
          //   darkMode ? themeStyle.dark.container : themeStyle.light.container,
          //   { borderColor: "red", borderWidth: 2 },
          // ]}
          >
            <View>
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
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
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
                  <Text
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
                    {raceDetails.language_desc}
                  </Text>
                </View>

                <View>
                  <Text
                    style={
                      darkMode ? themeStyle.dark.text : themeStyle.light.text
                    }>
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
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                Alignement :{" "}
              </Text>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {raceDetails.alignment}
              </Text>
            </View>

            <View>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                Bonus de Race :
              </Text>
              {raceDetails.ability_bonuses &&
                raceDetails.ability_bonuses.map((bonus, index) => {
                  console.log(bonus);
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
            </View>

            <View>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
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
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
    // borderWidth: 3,
    // borderColor: "red",
  },
});

export default RaceComponent;
