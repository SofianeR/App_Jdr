import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const NavComponent = ({ darkMode, setNext, next }) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={{
          padding: 4,
          borderRadius: 5,
          marginVertical: Dimensions.get("screen").height / 40,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          if (next > 0) {
            setNext((prevState) => prevState - 1);
          }
        }}>
        <Text style={{ color: "#3490dc", fontSize: 20 }}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          if (next < 6) {
            setNext((prevState) => prevState + 1);
          }
        }}>
        <Text style={{ color: themeStyle.dark.color }}>Suivant →</Text>
      </TouchableOpacity>
    </View>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonNav: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#3490dc",
    marginVertical: Dimensions.get("screen").height / 40,
  },
});

export default NavComponent;
