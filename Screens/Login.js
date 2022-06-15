import axios from "axios";
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

const LoginScreen = ({ navigation, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      setUser(response.data.token);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <View style={styles.container}>
      {errorMessage ? (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      ) : null}
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(v) => {
          setEmail(v);
        }}
      />
      <TextInput
        placeholder="password"
        onChangeText={(v) => {
          setPassword(v);
        }}
      />
      <Button title="Login" onPress={login} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}>
        <Text>Pas encore de compte ? C'est par ici !</Text>
      </TouchableOpacity>
    </View>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
