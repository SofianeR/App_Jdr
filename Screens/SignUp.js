import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";

import axios from "axios";
import LoadingComponent from "../Shared/LoadingComponent";

const SignUpScreen = ({ navigation, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Signup = async () => {
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
        setErrorMessage("Les mots de passes ne sont pas identique");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <View style={styles.container}>
      {errorMessage ? (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      ) : null}

      <Text>Sign Up</Text>

      <TextInput
        placeholder="email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />

      <TextInput
        placeholder="username"
        onChangeText={(v) => {
          setUsername(v);
        }}
      />

      <TextInput
        placeholder="password"
        onChangeText={(v) => {
          setPassword(v);
        }}
      />

      <TextInput
        placeholder="confirmPassword"
        onChangeText={(v) => {
          setConfirmPassword(v);
        }}
      />

      <Button title={"SignUp"} onPress={Signup} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}>
        <Text>Déja un compte ? C'est par ici</Text>
      </TouchableOpacity>
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

export default SignUpScreen;
