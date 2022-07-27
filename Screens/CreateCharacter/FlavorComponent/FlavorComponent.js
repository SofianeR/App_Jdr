import React, { useState } from "react";

import {
  ScrollView,
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
    <ScrollView contentContainerStyle={styles.inputView}>
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
          style={styles.inputState}
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
        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}>
          {defauts.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const copyDefauts = [...defauts];
                  copyDefauts.splice(index, 1);
                  setDefauts(copyDefauts);
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

        <TextInput
          value={inputDefaut}
          placeholder="Defaut"
          style={styles.inputState}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputDefaut(v);
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
            const copyDefaut = [...defauts];
            if (copyDefaut.length < 3) {
              copyDefaut.push(inputDefaut);

              setDefauts(copyDefaut);

              setInputDefaut("");
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
        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}>
          {traitPersonnalite.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const copyTraits = [...traitPersonnalite];
                  copyTraits.splice(index, 1);
                  setTraitPersonnalite(copyTraits);
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
        <TextInput
          value={inputTraits}
          placeholder="Traits de Personnalité"
          style={styles.inputState}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputTraits(v);
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
            const copyTraits = [...traitPersonnalite];
            if (copyTraits.length < 3) {
              copyTraits.push(inputTraits);

              setTraitPersonnalite(copyTraits);

              setInputTraits("");
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
        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}>
          {liens.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const copyLiens = [...liens];
                  copyLiens.splice(index, 1);
                  setLiens(copyLiens);
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
        <TextInput
          value={inputLiens}
          placeholder="Liens"
          style={styles.inputState}
          placeholderTextColor={"#3490dc"}
          onChangeText={(v) => {
            setInputLien(v);
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
            const copyLiens = [...liens];
            if (copyLiens.length < 3) {
              copyLiens.push(inputLiens);

              setLiens(copyLiens);

              setInputLien("");
            } else {
            }
          }}>
          <Text style={{ color: "white" }}>Ajouter +</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FlavorComponent;

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  inputView: {
    // marginTop: Dimensions.get("screen").height / 20,
    width: Dimensions.get("screen").width,
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
