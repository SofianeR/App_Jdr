import React from "react";

import SelectDropdown from "react-native-select-dropdown";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const NavComponent = ({ darkMode, setNext, next }) => {
  const createComponentsNav = [
    "Nom presonnage",
    "Alignement",
    "Race",
    "Classe",
    "Caractéristiques",
    "Idéaux [...]",
    "Histoire",
  ];
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={{
          padding: 5,
          borderRadius: 5,
          // marginVertical: Dimensions.get("screen").height / 40,
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

      <SelectDropdown
        buttonStyle={{
          // marginTop: Dimensions.get("screen").height / 50,
          height: "100%",
          width: "45%",
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  color: themeStyle.blueColor,
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}>
                {item}
              </Text>
            </View>
          );
        }}
        data={createComponentsNav}
        onSelect={(selectedItem, index) => {
          setNext(index);
        }}
        defaultButtonText={"Navigation"}
        buttonTextAfterSelection={() => {
          return "Navigation";
        }}
      />

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          if (next < 7) {
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
    height: Dimensions.get("screen").height / 20,
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 5,
    margin: 5,
  },
  buttonNav: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#3490dc",
    // marginVertical: Dimensions.get("screen").height / 40,
  },
});

export default NavComponent;
