import React, { useState, useEffect } from "react";

import {
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
  name,
  setName,
  race,
  setRace,
  classe,
  setClasse,
  alignment,
  setAlignment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [alignments, setAlignments] = useState([]);

  useEffect(() => {
    const getClass = async () => {
      setIsLoading(true);
      setErrorMessage("");
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

    const getAlignments = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get(
          "https://www.dnd5eapi.co/api/alignments"
        );

        const results = response.data.results;

        const arrayAlignments = [];

        results.map((result) => {
          arrayAlignments.push(result.name);
        });
        setAlignments(arrayAlignments);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };

    getClass();
    getRaces();
    getAlignments();
  }, []);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <View>
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

      <View
        // style={{
        //   marginTop: Dimensions.get("screen").height / 30,
        // }}
        style={styles.container}>
        <Text style={themeStyle.dark.text}>
          Choisis la race de ton personnage.
        </Text>
        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
          }}
          data={races}
          onSelect={(selectedItem, index) => {
            setRace(selectedItem);
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={themeStyle.dark.text}>
          choisis la classe de ton personnage
        </Text>
        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
          }}
          data={classes}
          onSelect={(selectedItem, index) => {
            setClasse(selectedItem);
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
        />
      </View>
    </View>
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
