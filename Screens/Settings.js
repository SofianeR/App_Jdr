import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";

const SettingsScreen = ({ darkMode, setDarkMode, setUser }) => {
  return (
    <View
      style={[
        darkMode ? themeStyle.dark.container : themeStyle.light.container,
      ]}>
      <Button
        title={"DarkMode"}
        onPress={() => {
          setDarkMode(!darkMode);
        }}
      />

      <Button
        title="Déconnexion"
        onPress={() => {
          setUser(null);
        }}
      />
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {},
});

export default SettingsScreen;
