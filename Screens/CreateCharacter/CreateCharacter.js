import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import StatComponent from "./StatComponent";
import NameClassComponent from "./NameClass";
import axios from "axios";

const CreateCharacter = ({ darkMode, token, navigation }) => {
  // navigation components
  const [next, setNext] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // error message to display
  const [errorMessage, setErrorMessage] = useState("");

  // state nameClass component
  const [name, setName] = useState();
  const [race, setRace] = useState();
  const [classe, setClasse] = useState();
  const [alignment, setAlignment] = useState();

  // state stats
  const [characteristics, setCharacteristics] = useState([
    { force: "" },
    { dext: "" },
    { const: "" },
    { int: "" },
    { sag: "" },
    { char: "" },
  ]);

  const createNewCharacter = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/character/create/",
        {
          generalInfo: {
            name: name,
            race: race,
            class: classe,
            alignment: alignment,
          },
          characteristics: characteristics,
          token: token,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
    navigation.navigate("HomeScreen");
  };

  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "space-around",
        },
        darkMode ? themeStyle.dark.container : themeStyle.light.container,
      ]}>
      {next === 0 ? (
        <NameClassComponent
          name={name}
          setName={setName}
          race={race}
          setRace={setRace}
          classe={classe}
          setClasse={setClasse}
          alignment={alignment}
          setAlignment={setAlignment}
        />
      ) : next === 1 ? (
        <StatComponent
          darkMode={darkMode}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
      ) : next === 2 ? (
        <View>
          <TouchableOpacity onPress={createNewCharacter}>
            <Text style={themeStyle.dark.text}>Send to Server</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            setNext((prevState) => prevState - 1);
          }}>
          <Text style={{ color: themeStyle.dark.color }}>Précédent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setNext((prevState) => prevState + 1);
          }}>
          <Text style={{ color: themeStyle.dark.color }}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  containerStat: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    borderWidth: 3,
    borderColor: "white",
    padding: "5%",
    marginTop: Dimensions.get("screen").height / 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nav: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});

export default CreateCharacter;
