import React, { useState } from "react";

import { View, Text, TextInput, Dimensions } from "react-native";

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
  return (
    <View>
      <View>
        <Text style={themeStyle.dark.text}>
          Entre le nom de ton personnage !
        </Text>
        <TextInput
          value={name}
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 50,
          }}
          placeholder="Nom du personnage"
          onChangeText={(v) => {
            setName(v);
          }}
        />
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
        }}>
        <Text style={themeStyle.dark.text}>
          choisis la race de ton personnage
        </Text>
        <TextInput
          value={race}
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 50,
          }}
          placeholder="Nom du race"
          onChangeText={(v) => {
            setRace(v);
          }}
        />
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
        }}>
        <Text style={themeStyle.dark.text}>
          choisis la classe de ton personnage
        </Text>
        <TextInput
          value={classe}
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 50,
          }}
          placeholder="Nom du classe"
          onChangeText={(v) => {
            setClasse(v);
          }}
        />
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
        }}>
        <Text style={themeStyle.dark.text}>
          choisis l'alignement de ton personnage
        </Text>
        <TextInput
          value={alignment}
          style={{
            backgroundColor: "white",
            marginTop: Dimensions.get("screen").height / 50,
          }}
          placeholder="Nom du alignment"
          onChangeText={(v) => {
            setAlignment(v);
          }}
        />
      </View>
    </View>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

export default NameClassComponent;
