import React, { useState } from "react";

import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

const NameComponent = ({ darkMode, name, setName }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [characterPicture, setCharacterPicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(true);

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setCharacterPicture(result.uri);
      setPreviewPicture(true);
    } else {
      setErrorMessage("Error fetch picture");
    }
  };
  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={{ height: Dimensions.get("screen").height / 20 }}>
        <Text
          style={[
            darkMode ? themeStyle.dark.text : themeStyle.light.text,
            { fontWeight: "bold", fontSize: 20, textAlign: "center" },
          ]}>
          Aventure de
        </Text>

        <Text
          style={[
            darkMode ? themeStyle.dark.text : themeStyle.light.text,
            { fontWeight: "bold", fontSize: 24, textAlign: "center" },
          ]}>
          {name}
        </Text>
      </View>

      {errorMessage ? (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      ) : null}
      <TextInput
        value={name}
        style={styles.inputState}
        placeholder="Nom du personnage"
        placeholderTextColor={themeStyle.blueColor}
        onChangeText={(v) => {
          setName(v);
        }}
      />
      <View>
        <Button title="Ajouter une image" onPress={getImage} />
        {characterPicture && (
          <View style={{ marginTop: Dimensions.get("screen").height / 30 }}>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "flex-end" }}
              onPress={() => {
                setPreviewPicture((prevState) => !prevState);
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                }}>
                {previewPicture ? "Fermer Preview" : "Ouvrir Preview"}
              </Text>
            </TouchableOpacity>
            {previewPicture && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: Dimensions.get("screen").height / 3.5,
                }}>
                <Image
                  source={{ uri: characterPicture }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: Dimensions.get("screen").height / 1.5,
    // borderColor: "red",
    // borderWidth: 1,
    justifyContent: "space-around",
  },

  inputState: {
    padding: 10,
    marginTop: Dimensions.get("screen").height / 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    width: Dimensions.get("screen").width / 1.2,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default NameComponent;
