import React, { useState } from "react";

import { View, Text, TextInput, StyleSheet } from "react-native";

const FlavorComponent = ({ darkMode }) => {
  const [physique, setPhysique] = useState({});
  const [traitPersonnalite, setTraitPersonnalite] = useState([]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
        Flavor Component
      </Text>
      <TextInput
        placeholder="Description physique"
        onChangeText={(v) => {
          setPhysique(v);
        }}
      />
      <TextInput
        placeholder="Trait de personnalité"
        onChangeText={(v) => {
          setTraitPersonnalite(v);
        }}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />
    </View>
  );
};

export default FlavorComponent;

const themeStyle = require("../../Styles/ThemeMode");
