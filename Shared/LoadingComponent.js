import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Text> En cours de chargement ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingComponent;
