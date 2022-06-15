import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

const HomeScreen = ({ darkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [characterList, setCharacterList] = useState();

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get("http://localhost:3000/character/all");

        setCharacterList(response.data.listCharacter);

        console.log(response.data.listCharacter);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchCharacter();
  }, []);
  return isLoading ? (
    <View
      style={darkMode ? themeStyle.dark.container : themeStyle.light.container}>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
        En cours de chargement
      </Text>
    </View>
  ) : (
    <View
      style={darkMode ? themeStyle.dark.container : themeStyle.light.container}>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
        HomeScreen
      </Text>
      {characterList &&
        characterList.map((item, index) => {
          console.log(item);
          return (
            <View key={index}>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {item.name}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonContainer: {
    alignItems: "center",

    position: "absolute",
    bottom: 15,
    right: 15,
  },
  addButtonView: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: themeStyle.color,
    borderRadius: "50%",
    paddingVertical: 10,
    width: "45%",
  },
  text: {
    marginTop: 10,
  },
});

export default HomeScreen;
