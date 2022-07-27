import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Proficiencies = ({
  darkMode,
  classeDetails,
  bonusMaitrise,
  setBonusMaitrise,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={[
          darkMode ? themeStyle.dark.text : themeStyle.light.text,
          themeStyle.title,
        ]}>
        Bonus de maîtrise de classe:
      </Text>
      {errorMessage ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={[
              themeStyle.title,
              { color: "red", marginTop: 0, fontSize: 15 },
            ]}>
            {errorMessage}
          </Text>
        </View>
      ) : null}
      {classeDetails.proficiency_choices.map((item, index) => {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}>
              {bonusMaitrise.length > 0 &&
                bonusMaitrise.map((selectedBonus, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setErrorMessage("");
                        const copyBonusMaitrise = [...bonusMaitrise];
                        copyBonusMaitrise.splice(index, 1);
                        setBonusMaitrise(copyBonusMaitrise);

                        item.from.push(selectedBonus);
                      }}>
                      <Text
                        key={index}
                        style={
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text
                        }>
                        {selectedBonus.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>

            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              Choisissez {item.choose} bonus de maîtrise de la liste suivante
            </Text>

            <View style={{ alignItems: "center" }}>
              {item.from
                .sort((a, b) => {
                  let fa = a.index;
                  let fb = b.index;

                  if (fa < fb) {
                    return -1;
                  }
                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                })
                .map((bonus, index) => {
                  return (
                    <TouchableOpacity
                      // style={{ marginTop: 5 }}
                      onPress={() => {
                        if (bonusMaitrise.length < item.choose) {
                          const copyBonusMaitrise = [...bonusMaitrise];

                          copyBonusMaitrise.push(bonus);

                          setBonusMaitrise(copyBonusMaitrise);

                          item.from.splice(index, 1);
                        } else {
                          setErrorMessage(
                            "Vous avez atteint le nombre maximum de bonus autorisés"
                          );
                        }
                      }}>
                      <Text
                        style={[
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text,
                          ,
                        ]}>
                        {bonus.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        );
      })}
    </View>
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
export default Proficiencies;
