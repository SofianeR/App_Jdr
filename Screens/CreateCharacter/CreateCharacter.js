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

import axios from "axios";

import NameClassComponent from "./NameClass";
import ClassComponent from "./ClassComponent";
import StatComponent from "./StatComponent";
import FlavorComponent from "./FlavorComponent";
import RaceComponent from "./RaceComponent";

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
    { name: "force", value: "1", modificateur: 0 },
    { name: "dexterite", value: "1", modificateur: 0 },
    { name: "constitution", value: "1", modificateur: 0 },
    { name: "intelligence", value: "1", modificateur: 0 },
    { name: "sagesse", value: "1", modificateur: 0 },
    { name: "charisme", value: "1", modificateur: 0 },
  ]);

  const createNewCharacter = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      //  const url_server =   "http://localhost:3000/character/create"
      const url_server = "https://jdr-app.herokuapp.com/charcter/create";

      const response = await axios.post(url_server, {
        generalInfo: {
          name: name,
          race: race,
          class: classe,
          alignment: alignment,
        },
        characteristics: characteristics,
        token: token,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
    // navigation.navigate("Home");
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
          darkMode={darkMode}
        />
      ) : next === 1 ? (
        <RaceComponent darkMode={darkMode} race={race} setRace={setRace} />
      ) : next === 2 ? (
        <ClassComponent
          darkMode={darkMode}
          classe={classe}
          setClasse={setClasse}
        />
      ) : next === 3 ? (
        <StatComponent
          darkMode={darkMode}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
      ) : next === 4 ? (
        <FlavorComponent darkMode={darkMode} />
      ) : next === 5 ? (
        <View>
          <Text>{errorMessage}</Text>
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
            console.log(next);
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
