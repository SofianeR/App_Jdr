import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

import LoadingComponent from "../../Shared/LoadingComponent";

const NameClassComponent = ({
  darkMode,
  name,
  setName,
  alignment,
  setAlignment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [alignments, setAlignments] = useState([]);
  const [alignmentsData, setAlignmentData] = useState();

  useEffect(() => {
    const getAlignments = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get(
          "https://www.dnd5eapi.co/api/alignments"
        );

        const results = response.data.results;

        const arrayAlignments = [];
        const arrayDescriptionAlignments = [];

        const promiseToResolve = results.map(async (result) => {
          arrayAlignments.push(result.name);

          const response = await axios.get(
            `https://www.dnd5eapi.co${result.url}`
          );

          arrayDescriptionAlignments.push({
            name: response.data.name,
            desc: response.data.desc,
          });
        });

        return Promise.all(promiseToResolve).then(() => {
          setAlignments(arrayAlignments);
          setAlignmentData(arrayDescriptionAlignments);
          setIsLoading(false);
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };

    getAlignments();
  }, []);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <Text style={themeStyle.dark.text}>
          Entre le nom de ton personnage !
        </Text>
        <TextInput
          value={name}
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 50,
            width: Dimensions.get("screen").width - 50,
            padding: 5,
            marginBottom: 0,
          }}
          placeholder="Nom du personnage"
          onChangeText={(v) => {
            setName(v);
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={themeStyle.dark.text}>
          choisis l'alignement de ton personnage
        </Text>
        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
          }}
          data={alignments}
          onSelect={(selectedItem, index) => {
            setAlignment(selectedItem);
          }}
          defaultButtonText={alignment ? alignment : null}
        />
      </View>
      <View>
        {alignmentsData &&
          alignmentsData.map((item, index) => {
            console.log(item.name);
            return (
              <View key={index}>
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {item.name}
                </Text>

                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {item.desc}
                </Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").height / 30,
    width: Dimensions.get("screen").width - 20,
    // borderColor: "orange",
    // borderWidth: 3,
  },
});

export default NameClassComponent;
