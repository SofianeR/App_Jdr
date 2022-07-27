import React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import AlignmentComponentr from "../CreateCharacter/AlignmentComponent/AlignmentComponent";
const SingleCharacterScreen = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Button title="Console" onPress={() => {}} />
      <Text>{character.name}</Text>
      <Text>SingleCharacter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SingleCharacterScreen;
