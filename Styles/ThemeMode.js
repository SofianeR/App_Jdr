import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  light: {
    color: "black",

    activeTab: "white",

    container: {
      flex: 1,

      paddingHorizontal: Dimensions.get("screen").width / 13,
      paddingTop: Dimensions.get("screen").height / 30,

      backgroundColor: "white",
    },

    text: {
      color: "black",
    },
  },
  dark: {
    color: "white",

    activeTab: "#05162A",

    container: {
      flex: 1,

      paddingHorizontal: Dimensions.get("screen").width / 13,
      paddingTop: Dimensions.get("screen").height / 30,

      backgroundColor: "#222222",
    },

    text: {
      color: "white",
    },
  },
});
