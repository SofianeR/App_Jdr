import axios from "axios";
import React, { useState, useRef } from "react";

import LottieView from "lottie-react-native";

import LoadingSendServer from "../../Shared/LoadingSendServer";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";

const LoginScreen = ({ navigation, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const animation = useRef(null);

  const login = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (email && password) {
        // const url_server = "http://localhost:3000/user/login";
        const url_server = "https://jdr-app.herokuapp.com/user/login";

        const response = await axios.post(url_server, {
          email: email,
          password: password,
        });
        console.log(response.data);
        setUser(response.data.token);
      } else {
        setErrorMessage("Un des champs est vide");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "90%",
          height: Dimensions.get("screen").height / 3.5,
          backgroundColor: "#3490dc",
          padding: 0,
          margin: 0,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/Lotties/97027-warriors.json")}
      />

      {isLoading ? (
        <LoadingSendServer />
      ) : (
        <>
          <View style={styles.inputView}>
            {errorMessage ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                marginTop: Dimensions.get("screen").height / 30,
                alignItems: "center",
              }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                Connectez-Vous !{" "}
              </Text>
            </View>
            <View
              style={{
                marginTop: Dimensions.get("screen").height / 30,
                alignItems: "center",
              }}>
              {/* <Text style={{ color: "white" }}>Email : </Text> */}
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#3490dc"}
                onChangeText={(v) => {
                  setEmail(v);
                }}
                style={styles.inputLogin}
              />
            </View>

            <View
              style={{
                marginTop: Dimensions.get("screen").height / 30,
                alignItems: "center",
              }}>
              {/* <Text style={{ color: "white" }}>Mot de passe : </Text> */}
              <TextInput
                placeholder="Mot de Passe"
                placeholderTextColor={"#3490dc"}
                onChangeText={(v) => {
                  setPassword(v);
                }}
                style={styles.inputLogin}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.sendServer]} onPress={login}>
            <Text style={styles.sendServerText}>Se Connecter</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        style={styles.linkOtherScreen}>
        <Text style={styles.linkToOtherScreenText}>
          Pas encore de compte ? C'est par ici !
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
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "#222222",
    paddingBottom: Dimensions.get("screen").height / 13,
  },
  linkOtherScreen: {
    marginTop: Dimensions.get("screen").height / 30,
  },

  linkToOtherScreenText: {
    fontSize: 20,
    color: "#3490dc",
  },
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
});

export default LoginScreen;
