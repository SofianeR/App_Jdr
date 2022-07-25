import React, { useState } from "react";

import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

const NameComponent = ({ darkMode, name, setName }) => {
  return (
    <View
      style={darkMode ? themeStyle.dark.container : themeStyle.light.container}>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
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
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NameComponent;
