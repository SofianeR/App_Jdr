import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Equipment = ({ darkMode, classeDetails }) => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <View style={{ marginTop: 10 }}>
      {classeDetails.starting_equipment ? (
        <View>
          <Text style={[themeStyle.title, { color: "white" }]}>
            Equipements :
          </Text>
          <View>
            <Text style={[themeStyle.h2, { color: "white" }]}>
              Equipements de départ:
            </Text>
            {classeDetails.starting_equipment.map((item, index) => {
              return (
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {item.equipment.name}
                </Text>
              );
            })}
          </View>
        </View>
      ) : null}

      {classeDetails.starting_equipment_options.map((setOfEquipment, index) => {
        const setKeys = Object.keys(setOfEquipment).join();

        return (
          <View>
            <Text
              style={
                themeStyle.dark.text
              }>{`Choisissez ${setOfEquipment.choose} équipement de la liste suivante`}</Text>
            <View>
              {setOfEquipment.from.map((equipment, index) => {
                const keys = Object.keys(equipment);
                if (keys[0] === "0") {
                  console.log(equipment[keys[1]].equipment_option);
                  return (
                    <>
                      <TouchableOpacity>
                        <Text style={themeStyle.dark.text}>
                          {/* {equipment[keys[0]].equipment.name} */}
                        </Text>
                      </TouchableOpacity>

                      {
                        //  equipment[keys[1]].equipment_option.from
                        // ?
                        //    <TouchableOpacity>
                        //     <Text style={themeStyle.dark.text}>
                        //   {
                        //     equipment[keys[1]].equipment_option.from
                        //       .equipment_category.name
                        //   }
                        // </Text>
                        //    </TouchableOpacity>
                        // : null
                      }
                    </>
                  );
                }
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
export default Equipment;
