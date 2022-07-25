import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const FlavorComponent = ({ darkMode }) => {
  const [inputIdeal, setInputIdeal] = useState("");
  const [inputDefaut, setInputDefaut] = useState("");
  const [inputTraits, setInputTraits] = useState("");
  const [inputLiens, setInputLien] = useState("");

  const [traitPersonnalite, setTraitPersonnalite] = useState([]);
  const [ideaux, setIdeaux] = useState([]);
  const [defauts, setDefauts] = useState([]);
  const [liens, setLiens] = useState([]);

  return (
    <View style={styles.inputView}>
      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
          alignItems: "center",
        }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Histoire et lore de votre personnage !
        </Text>
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
          alignItems: "center",
        }}>
        {ideaux && ideaux.length > 0 && (
          <View
            style={{
              width: "100%",
              justifyContent: "space-around",
              flexDirection: "row",
            }}>
            {ideaux.map((item, index) => {
              console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    const copyIdeaux = [...ideaux];
                    copyIdeaux.splice(index, 1);
                    setIdeaux(copyIdeaux);
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "white",
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TextInput
          value={inputIdeal}
          placeholder="Idéaux"
          style={styles.inputLogin}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputIdeal(v);
          }}
        />
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 5,
            backgroundColor: themeStyle.blueColor,
            marginTop: "2%",
          }}
          onPress={() => {
            const copyIdeaux = [...ideaux];
            if (copyIdeaux.length < 3) {
              copyIdeaux.push(inputIdeal);

              setIdeaux(copyIdeaux);
              console.log(ideaux);

              setInputIdeal("");
            } else {
            }
          }}>
          <Text style={{ color: "white" }}>Ajouter +</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
          alignItems: "center",
        }}>
        {defauts.length > 0 &&
          defauts.map((item) => {
            // console.log(item);
          })}

        <TextInput
          value={inputDefaut}
          placeholder="Defaut"
          style={styles.inputLogin}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputDefaut(v);
          }}
        />
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
          alignItems: "center",
        }}>
        <TextInput
          value={inputTraits}
          placeholder="Traits de Personnalité"
          style={styles.inputLogin}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputTraits(v);
          }}
        />
      </View>

      <View
        style={{
          marginTop: Dimensions.get("screen").height / 30,
          alignItems: "center",
        }}>
        <TextInput
          value={inputLiens}
          placeholder="Liens"
          style={styles.inputLogin}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputLien(v);
          }}
        />
      </View>
    </View>
  );
};

export default FlavorComponent;

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  inputView: {
    marginTop: Dimensions.get("screen").height / 20,
  },
  inputLogin: {
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
