import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";

import axios from "axios";

import NameComponent from "./NameComponent/NameComponent";
import AlignmentComponent from "./AlignmentComponent/AlignmentComponent";
import RaceComponent from "./RaceComponent/RaceComponent";
import ClassComponent from "./ClassComponent/ClassComponent";
import StatComponent from "./StatComponent/StatComponent";
import FlavorComponent from "./FlavorComponent/FlavorComponent";
import NavComponent from "./NavComponent/NavComponent";

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
    { name: "force", value: false, modificateur: 0, abbr: "FOR" },
    { name: "dexterite", value: false, modificateur: 0, abbr: "DEXT" },
    { name: "constitution", value: false, modificateur: 0, abbr: "CONST" },
    { name: "intelligence", value: false, modificateur: 0, abbr: "INT" },
    { name: "sagesse", value: false, modificateur: 0, abbr: "SAG" },
    { name: "charisme", value: false, modificateur: 0, abbr: "CHAR" },
  ]);

  // state display
  const [modal, setModal] = useState(false);

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
        <NameComponent name={name} setName={setName} darkMode={darkMode} />
      ) : next === 1 ? (
        <AlignmentComponent
          alignment={alignment}
          setAlignment={setAlignment}
          darkMode={darkMode}
          modal={modal}
          setModal={setModal}
        />
      ) : next === 2 ? (
        <RaceComponent darkMode={darkMode} race={race} setRace={setRace} />
      ) : next === 3 ? (
        <ClassComponent
          darkMode={darkMode}
          classe={classe}
          setClasse={setClasse}
        />
      ) : next === 4 ? (
        <StatComponent
          darkMode={darkMode}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
      ) : next === 5 ? (
        <FlavorComponent darkMode={darkMode} />
      ) : next === 6 ? (
        isLoading ? (
          <LoadingSendServer />
        ) : (
          <View>
            <Text>{errorMessage}</Text>
            <TouchableOpacity onPress={createNewCharacter}>
              <Text style={themeStyle.dark.text}>Send to Server</Text>
            </TouchableOpacity>
          </View>
        )
      ) : null}
      {!modal ? (
        <NavComponent next={next} setNext={setNext} darkMode={darkMode} />
      ) : (
        <Button
          title="Console"
          onPress={() => {
            setModal(false);
          }}
        />
      )}
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
});

export default CreateCharacter;
