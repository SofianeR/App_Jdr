import axios from "axios";
import React, { useState, useEffect } from "react";

import LoadingGetServer from "../Shared/LoadingGetServer";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const ModalHelp = ({ route, darkMode, navigation }) => {
  const { url_api } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [helpData, setHelpData] = useState();
  // const [detailHelpData, setDetailHelpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage("");
      setIsLoading(true);
      try {
        const helpDataObject = {};

        const response = await axios.get(`https://www.dnd5eapi.co${url_api}`);
        helpDataObject.general = response.data;

        const detailsResponse = await axios.get(
          `https://www.dnd5eapi.co${response.data.reference.url}`
        );

        helpDataObject.detail = detailsResponse.data;

        setHelpData(helpDataObject);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingGetServer />
  ) : (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer]}
      showsVerticalScrollIndicator={false}>
      <Button
        title="Console"
        onPress={() => {
          // console.log(helpData);
        }}
      />

      <View
        style={[
          {
            height: "5%",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: themeStyle.blueColor,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{ fontSize: 15, color: "white" }}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            backgroundColor: themeStyle.blueColor,
          }}>
          <Text style={[themeStyle.title, { color: "red" }]}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {helpData && (
        <View style={[styles.container]}>
          <View style={[]}>
            <Text style={styles.titleHelp}>{helpData.general.name}</Text>
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
              },
            ]}>
            <Text style={themeStyle.dark.text}>
              {`Prix : ${helpData.detail.cost.quantity} ${helpData.detail.cost.unit}`}
            </Text>
            <Text style={themeStyle.dark.text}>
              Poids: {helpData.detail.weight}
            </Text>
            <Text style={themeStyle.dark.text}>
              {`Catégorie Equipement: ${helpData.detail.equipment_category.name}`}
            </Text>
            <Text style={themeStyle.dark.text}>
              Type Equipement: {helpData.general.type}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: Dimensions.get("screen").height / 30,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
              }}>
              Description :
            </Text>
            <Text
              style={[
                themeStyle.dark.text,
                {
                  marginTop: Dimensions.get("screen").height / 40,
                },
              ]}>
              {helpData.detail.desc}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const themeStyle = require("../Styles/ThemeMode");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
  },
  container: {
    flex: 1,
    backgroundColor: themeStyle.blueColor,

    alignItems: "center",

    // borderColor: "orange",
    // borderWidth: 3,
    paddingHorizontal: 10,
  },
  titleHelp: [
    themeStyle.title,
    {
      color: "white",
    },
  ],
});

export default ModalHelp;
