import { useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Screens
import LoginScreen from "./Screens/Login";
import SignUpScreen from "./Screens/SignUp";

import HomeScreen from "./Screens/Home";
import SettingsScreen from "./Screens/Settings";
import CreateCharacter from "./Screens/CreateCharacter/CreateCharacter";
import SingleCharacterScreen from "./Screens/SingleCharacter/SingleCharacterScreen";

// import icon
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // darkMode State => change le style a partir des valeurs de ./Styles/ThemeMode.js
  const [darkMode, setDarkMode] = useState(false);

  const [token, setToken] = useState();

  const setUser = (token) => {
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  };

  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name={"SignUp"}>
            {(props) => <SignUpScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode
                ? themeStyle.dark.container.backgroundColor
                : themeStyle.light.container.backgroundColor,
            },
            headerTitleStyle: {
              color: darkMode ? themeStyle.dark.color : themeStyle.light.color,
            },
          }}>
          <Tab.Screen
            name={"Home"}
            options={{
              unmountOnBlur: true,
              tabBarIcon: () => {
                return (
                  <Ionicons
                    name="home-outline"
                    size={24}
                    color={
                      darkMode ? themeStyle.dark.color : themeStyle.light.color
                    }
                  />
                );
              },

              tabBarActiveBackgroundColor: darkMode
                ? themeStyle.dark.activeTab
                : themeStyle.light.activeTab,
              tabBarInactiveBackgroundColor: darkMode
                ? themeStyle.dark.container.backgroundColor
                : themeStyle.light.container.backgroundColor,
              headerShown: false,
            }}>
            {(props) => (
              <Stack.Navigator>
                <Stack.Screen name={"HomeScreen"}>
                  {(props) => (
                    <HomeScreen {...props} darkMode={darkMode} token={token} />
                  )}
                </Stack.Screen>
                <Stack.Screen name="SingleCharacter">
                  {(props) => <SingleCharacterScreen {...props} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name={"Create Character"}
            options={{
              unmountOnBlur: true,
              tabBarIcon: () => {
                return (
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color={
                      darkMode ? themeStyle.dark.color : themeStyle.light.color
                    }
                  />
                );
              },

              tabBarActiveBackgroundColor: darkMode
                ? themeStyle.dark.activeTab
                : themeStyle.light.activeTab,
              tabBarInactiveBackgroundColor: darkMode
                ? themeStyle.dark.container.backgroundColor
                : themeStyle.light.container.backgroundColor,
            }}>
            {(props) => (
              <CreateCharacter {...props} darkMode={darkMode} token={token} />
            )}
          </Tab.Screen>

          <Tab.Screen
            name={"Settings"}
            options={{
              tabBarIcon: () => {
                return (
                  <Ionicons
                    name="ios-settings-outline"
                    size={24}
                    color={
                      darkMode ? themeStyle.dark.color : themeStyle.light.color
                    }
                  />
                );
              },

              tabBarActiveBackgroundColor: darkMode
                ? themeStyle.dark.activeTab
                : themeStyle.light.activeTab,
              tabBarInactiveBackgroundColor: darkMode
                ? themeStyle.dark.container.backgroundColor
                : themeStyle.light.container.backgroundColor,
            }}>
            {(props) => (
              <SettingsScreen
                {...props}
                setDarkMode={setDarkMode}
                darkMode={darkMode}
                setUser={setUser}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const themeStyle = require("./Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
