import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

const LoadingComponent = ({ darkMode }) => {
  return (
    <View style={[themeStyle.dark.container, styles.container]}>
      <Text style={themeStyle.dark.text}>En cours de chargement ...</Text>
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingComponent;
