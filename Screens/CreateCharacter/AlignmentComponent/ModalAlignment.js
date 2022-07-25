import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const ModalAlignment = ({ darkMode, alignmentsData, modal, setModal }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.modal}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 5,
          alignItems: "flex-end",
        }}>
        <TouchableOpacity
          onPress={() => {
            setModal(false);
          }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            ✖︎
          </Text>
        </TouchableOpacity>
      </View>
      {alignmentsData &&
        alignmentsData.map((item, index) => {
          return (
            <View key={index} style={{ padding: 15 }}>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  {
                    fontSize: 20,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  },
                ]}>
                {item.name}
              </Text>

              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  { marginTop: 8 },
                ]}>
                {item.desc}
              </Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").height / 30,
    width: Dimensions.get("screen").width - 20,
    // borderColor: "orange",
    // borderWidth: 3,
  },

  scrollContainer: {
    flexGrow: 1,
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
    position: "relative",
  },

  modal: {
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,

    borderColor: "#757EAC",
    borderWidth: 2,
    borderRadius: 5,

    backgroundColor: "#3490dc",
  },
});

export default ModalAlignment;
