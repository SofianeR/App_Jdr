import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const StatComponent = ({ darkMode, characteristics, setCharacteristics }) => {
  const [charactValues, setCharactValues] = useState([]);

  const diceThrow = () => {
    const copyCharactValues = [];

    for (let i = 0; i < 6; i++) {
      let arrayOfValueToSum = [];

      for (let i = 0; i < 4; i++) {
        arrayOfValueToSum.push(Math.floor(Math.random() * (7 - 2) + 2));
      }

      arrayOfValueToSum.shift();

      const sum = arrayOfValueToSum.reduce((prevSum, num) => prevSum + num, 0);
      console.log(arrayOfValueToSum);

      copyCharactValues.push(sum);

      setCharactValues(copyCharactValues);
    }
  };
  return (
    <View>
      {charactValues && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {charactValues.map((charactValue, index) => {
            return (
              <Text
                key={index}
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.thext,
                  { marginBottom: 15 },
                ]}>
                {charactValue}
              </Text>
            );
          })}
        </View>
      )}
      <View style={styles.containerStat}>
        {characteristics &&
          characteristics.map((item, index) => {
            // const keys = Object.keys(item).join("");
            console.log(item);
            return (
              <View style={styles.statBox} key={index}>
                <TextInput
                  keyboardType="numeric"
                  value={item.value}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  onChangeText={(value) => {
                    const copyCharacteristics = [...characteristics];

                    if (value > 20) {
                      item.value = "20";
                      item.modificateur = Math.floor(
                        (Number(item.value) - 10) / 2
                      );
                    } else {
                      item.value = value;
                      item.modificateur = Math.floor(
                        (Number(item.value) - 10) / 2
                      );
                    }

                    setCharacteristics(copyCharacteristics);
                  }}
                />
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.thext
                  }>
                  {item.modificateur}
                </Text>
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.thext
                  }>
                  {item.name}
                </Text>
              </View>
            );
          })}
        <View>
          <Button
            title="Random Value"
            onPress={() => {
              diceThrow();
            }}
          />
        </View>
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
