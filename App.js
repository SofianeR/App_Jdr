import { useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Screens
import HomeScreen from "./Screens/Home";
import SettingsScreen from "./Screens/Settings";
import CreateCharacter from "./Screens/CreateCharacter/CreateCharacter";

// import icon
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  // darkMode State => change le style a partir des valeurs de ./Styles/ThemeMode.js
  const [darkMode, setDarkMode] = useState(false);

  return (
    <NavigationContainer>
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
          }}>
          {(props) => <HomeScreen darkMode={darkMode} />}
        </Tab.Screen>

        <Tab.Screen
          name={"Create Character"}
          options={{
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
          {(props) => <CreateCharacter {...props} darkMode={darkMode} />}
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
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
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
