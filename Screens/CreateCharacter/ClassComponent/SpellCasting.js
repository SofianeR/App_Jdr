import axios from "axios";
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const SpellCasting = ({ darkMode, classeDetails, navigation }) => {
  console.log(classeDetails.spellcasting);

  const orderDataBase = async () => {
    try {
      //   const url_server = "http://localhost:3000/fill/database";
      const url_server = `http://localhost:3000/spells?classe=${classeDetails.name.toLowerCase()}`;

      const response = await axios.get(url_server);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      {/* <Button title="console" onPress={orderDataBase} /> */}
      {classeDetails.spellcasting ? (
        <View>
          <Text style={[themeStyle.title, { color: "white" }]}>
            SpellCasting
          </Text>
          <View>
            <Text style={themeStyle.dark.text}>
              {`Stat pour sorts : ${classeDetails.spellcasting.spellcasting_ability.name}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Spells", {
                  classeName: classeDetails.name.toLowerCase(),
                });
              }}>
              <Text style={themeStyle.dark.text}>
                Acceder à la liste des sorts
              </Text>
            </TouchableOpacity>
            <View>
              {classeDetails.spellcasting.info.map((item, index) => {
                return (
                  <View>
                    <Text style={[themeStyle.title, { color: "white" }]}>
                      {item.name}
                    </Text>
                    <Text style={themeStyle.dark.text}>{item.desc}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {},
});

export default SpellCasting;
