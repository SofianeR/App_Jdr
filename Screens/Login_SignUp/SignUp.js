import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

import axios from "axios";
import LoadingSendServer from "../../Shared/LoadingSendServer";

const SignUpScreen = ({ navigation, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      if (password === confirmPassword) {
        //  const url_server =   "http://localhost:3000/user/signup"
        const url_server = "https://jdr-app.herokuapp.com/user/signup";

        const response = await axios.post(url_server, {
          email: email,
          username: username,
          password: password,
        });
        console.log(response.data);
        setUser(response.data.token);
      } else {
        setErrorMessage("Les mots de passes ne sont pas identiques");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <LoadingSendServer />
  ) : (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        Créer un compte !
      </Text>

      {errorMessage ? (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "red",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <TextInput
        placeholderTextColor={"#3490dc"}
        style={styles.inputLogin}
        placeholder="Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />

      <TextInput
        placeholderTextColor={"#3490dc"}
        style={styles.inputLogin}
        placeholder="Username"
        onChangeText={(v) => {
          setUsername(v);
        }}
      />

      <TextInput
        placeholderTextColor={"#3490dc"}
        style={styles.inputLogin}
        placeholder="Mot de Passe"
        onChangeText={(v) => {
          setPassword(v);
        }}
      />

      <TextInput
        placeholderTextColor={"#3490dc"}
        style={styles.inputLogin}
        placeholder="Confirmez votre mot de passe"
        onChangeText={(v) => {
          setConfirmPassword(v);
        }}
      />

      <TouchableOpacity style={[styles.sendServer]} onPress={signUp}>
        <Text style={styles.sendServerText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.linkOtherScreen}>
        <Text style={styles.linkToOtherScreenText}>
          Déja un compte ? C'est par ici
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const themeStyle = require("../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "#222222",
    paddingBottom: Dimensions.get("screen").height / 13,
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

  sendServer: {
    // borderColor: "white",
    // borderWidth: 2,
    marginTop: Dimensions.get("screen").height / 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#3490dc",
  },

  sendServerText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },

  linkToOtherScreenText: {
    fontSize: 20,
    color: "#3490dc",
  },

  linkOtherScreen: {
    marginTop: Dimensions.get("screen").height / 30,
  },
});

export default SignUpScreen;
