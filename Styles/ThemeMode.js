import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  blueColor: "#3490dc",
  greenColor: "#06C2A3",
  redColor: "#ff7b6f",

  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: Dimensions.get("screen").height / 30,
    marginBottom: "2%",
  },

  h2: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%",
  },

  light: {
    color: "black",

    activeTab: "white",

    backgroundColor: "white",

    container: {
      // flex: 1,
      flexGrow: 1,

      // paddingHorizontal: Dimensions.get("screen").width / 13,
      // paddingTop: Dimensions.get("screen").height / 30,
    },

    title: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: Dimensions.get("screen").height / 30,
      marginBottom: Dimensions.get("screen").height / 50,
      color: "black",
    },

    text: {
      color: "black",
      // padding: 3,
      fontWeight: "bold",
      fontSize: 19,
      marginTop: "2%",
    },
  },
  dark: {
    color: "white",

    activeTab: "#05162A",

    container: {
      flexGrow: 1,
      backgroundColor: "#222222",
    },

    title: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: Dimensions.get("screen").height / 30,
      marginBottom: Dimensions.get("screen").height / 50,
      color: "white",
    },

    text: {
      color: "white",
      // padding: 3,
      fontWeight: "bold",
      fontSize: 15,
      marginTop: "2%",
    },
  },
});
