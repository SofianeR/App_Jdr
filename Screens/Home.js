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
import LoadingGetServer from "../Shared/LoadingGetServer";

const HomeScreen = ({ darkMode, token, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        // const url_server = "http://localhost:3000/character/all";
        const url_server = "https://jdr-app.herokuapp.com/character/all";

        const response = await axios.post(url_server, {
          token,
        });

        setCharacterList(response.data.listCharacter);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchCharacter();
  }, []);

  const navigateToSingle = () => {};

  return isLoading ? (
    <LoadingGetServer darkMode={darkMode} />
  ) : (
    <View
      style={darkMode ? themeStyle.dark.container : themeStyle.light.container}>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
        HomeScreen
      </Text>
      {characterList.map((item, index) => {
        console.log(item);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("SingleCharacter", { character: item });
            }}>
            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              {item.name}
            </Text>
          </TouchableOpacity>
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
