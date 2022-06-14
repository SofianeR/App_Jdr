import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const SettingsScreen = ({ darkMode, setDarkMode }) => {
  return (
    <View
      style={[
        darkMode ? themeStyle.dark.container : themeStyle.light.container,
      ]}>
      <TouchableOpacity
        onPress={() => {
          setDarkMode(!darkMode);
        }}>
        <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
          DarkMode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {},
});

export default SettingsScreen;
