import React from "react";

import { View, Text, StyleSheet } from "react-native";

const WeaponMastery = ({ darkMode, classeDetails }) => {
  return (
    <>
      <Text
        style={[
          darkMode ? themeStyle.dark.text : themeStyle.light.text,
          themeStyle.title,
        ]}>
        Maîtrises des armes et armures :
      </Text>

      <View style={styles.proficienciesContainer}>
        {classeDetails.proficiencies.map((item, index) => {
          return (
            <View key={index}>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {item.name}
                {index < classeDetails.proficiencies.length - 1 && ","}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};
const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  proficienciesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
export default WeaponMastery;
