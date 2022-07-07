import React from "react";

import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

const StatComponent = ({ darkMode, characteristics, setCharacteristics }) => {
  return (
    <View>
      <View style={styles.containerStat}>
        {characteristics &&
          characteristics.map((item, index) => {
            const keys = Object.keys(item).join("");
            return (
              <View style={styles.statBox} key={index}>
                <TextInput
                  keyboardType="numeric"
                  value={item[keys]}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  onChangeText={(value) => {
                    const copyCharacteristics = [...characteristics];

                    if (value > 20) {
                      item[keys] = "20";
                    } else {
                      item[keys] = value;
                    }

                    setCharacteristics(copyCharacteristics);
                  }}
                />

                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.thext
                  }>
                  {keys}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};
const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  containerStat: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("screen").width,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    borderWidth: 3,
    borderColor: "white",
    padding: "5%",
    marginHorizontal: "2%",
    marginTop: Dimensions.get("screen").height / 30,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width / 4,
  },
});

export default StatComponent;
