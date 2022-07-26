import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const CharacterBackground = ({ darkMode }) => {
  const [Histoire, setHistoire] = useState("");

  const [characterAppearance, setCharacterAppearance] = useState([
    { age: null },
    { size: null },
    { weight: null },
    { eyes: null },
    { skin: null },
    { hair: null },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: Dimensions.get("screen").height / 30,
          }}>
          Description physique
        </Text>
        {characterAppearance &&
          characterAppearance.map((item, index) => {
            const keys = Object.keys(item).join();

            return (
              <TextInput
                key={index}
                // value={inputTraits}
                placeholder={keys}
                style={styles.inputState}
                placeholderTextColor={"#3490dc"}
                multiline={true}
                numberOfLines={4}
                onChangeText={(v) => {
                  const copyAppearance = [...characterAppearance];
                  copyAppearance[index][keys] = v;
                  setCharacterAppearance(copyAppearance);
                  console.log(characterAppearance);
                }}
              />
            );
          })}
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: Dimensions.get("screen").height / 30,
          }}>
          Histoire de votre personnage jusqu'au debut de l'aventure
        </Text>
        <TextInput
          value={Histoire}
          placeholder="Tapez ici ..."
          style={styles.textArea}
          placeholderTextColor={"#3490dc"}
          multiline={true}
          numberOfLines={50}
          onChangeText={(v) => {
            setHistoire(v);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CharacterBackground;

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  textArea: {
    padding: 10,
    marginVertical: Dimensions.get("screen").height / 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: Dimensions.get("screen").width / 1.2,
    fontWeight: "bold",
    fontSize: 15,
    height: Dimensions.get("screen").height / 3,
  },

  inputState: {
    padding: 10,
    marginTop: Dimensions.get("screen").height / 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: Dimensions.get("screen").width / 1.2,
    fontWeight: "bold",
    fontSize: 15,
    height: Dimensions.get("screen").height / 15,
  },
});
