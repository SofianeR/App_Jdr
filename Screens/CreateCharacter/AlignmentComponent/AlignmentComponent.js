import React, { useState, useEffect } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

import LoadingGetServer from "../../../Shared/LoadingGetServer";
import ModalAlignment from "./ModalAlignment";

const AlignmentComponent = ({
  darkMode,
  modal,
  setModal,
  alignment,
  setAlignment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [alignments, setAlignments] = useState([]);
  const [alignmentsData, setAlignmentData] = useState();

  useEffect(() => {
    const getAlignments = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get(
          "https://www.dnd5eapi.co/api/alignments"
        );

        const results = response.data.results;

        const arrayAlignments = [];
        const arrayDescriptionAlignments = [];

        const promiseToResolve = results.map(async (result) => {
          arrayAlignments.push(result.name);

          const response = await axios.get(
            `https://www.dnd5eapi.co${result.url}`
          );

          arrayDescriptionAlignments.push({
            name: response.data.name,
            desc: response.data.desc,
          });
        });

        return Promise.all(promiseToResolve).then(() => {
          setAlignments(arrayAlignments);
          setAlignmentData(arrayDescriptionAlignments);
          setIsLoading(false);
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };

    getAlignments();
  }, []);

  return isLoading ? (
    <LoadingGetServer />
  ) : modal ? (
    <ModalAlignment
      darkMode={darkMode}
      alignmentsData={alignmentsData}
      modal={modal}
      setModal={setModal}
    />
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={themeStyle.dark.text}>
          choisis l'alignement de ton personnage
        </Text>
        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
            borderColor: "red",
            borderWidth: 2,
            height: "20%",
            // width: "20%",
          }}
          data={alignments}
          onSelect={(selectedItem, index) => {
            setAlignment(selectedItem);
          }}
          defaultButtonText={alignment ? alignment : null}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setModal(!modal);
        }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          ？
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").height / 30,
    width: Dimensions.get("screen").width - 20,
    // borderColor: "orange",
    // borderWidth: 3,
  },

  scrollContainer: {
    flexGrow: 1,
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
    position: "relative",
  },

  modal: {
    padding: 15,

    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,

    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,

    position: "absolute",
    top: 0,
    zIndex: 1000,

    backgroundColor: "gray",
  },
});

export default AlignmentComponent;
