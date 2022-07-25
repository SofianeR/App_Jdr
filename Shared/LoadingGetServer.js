import React, { useRef } from "react";

import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import LottieView from "lottie-react-native";

const LoadingGetServer = ({ darkMode }) => {
  const animation = useRef(null);

  return (
    <View
      style={[
        darkMode ? themeStyle.light.container : themeStyle.dark.container,
        styles.container,
      ]}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height / 3.5,
          padding: 0,
          margin: 0,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/Lotties/loading.json")}
      />
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingGetServer;
