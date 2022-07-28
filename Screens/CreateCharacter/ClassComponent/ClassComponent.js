import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

import LoadingGetServer from "../../../Shared/LoadingGetServer";
import WeaponMastery from "./WeaponMastery";
import Proficiencies from "./Proficiencies";
import Equipment from "./Equipment";
import SpellCasting from "./SpellCasting";

const ClassComponent = ({ setClasse, classe, darkMode, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [classes, setClasses] = useState([]);

  const [classeDetails, setClasseDetails] = useState();

  const [bonusMaitrise, setBonusMaitrise] = useState([]);

  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    const getClass = async () => {
      setErrorMessage("");
      setIsLoading(true);
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/classes");

        const results = response.data.results;

        const arrayClass = [];

        results.map((result) => {
          arrayClass.push(result.name);
        });
        setClasses(arrayClass);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    getClass();
  }, []);

  const getClassFeatures = async (selectedClasse) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const url_api = `https://www.dnd5eapi.co/api/classes/${selectedClasse.toLowerCase()}`;

      const response = await axios.get(url_api);

      setClasseDetails(response.data);

      const copyEquipements = [];

      response.data.starting_equipment.map((item) => {
        copyEquipements.push({
          name: item.equipment.name,
          quantity: item.quantity,
        });
      });
      setEquipements(copyEquipements);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <LoadingGetServer />
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <Button
        title="Console"
        onPress={() => {
          console.log(classeDetails);
          //   console.log(bonusMaitrise, bonusMaitrise.length);
        }}
      />
      {errorMessage ? (
        <View>
          <Text
            style={{ color: "#FF7B6F", textAlign: "center", marginBottom: 10 }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <Text style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
          choisis la classe de ton personnage
        </Text>

        <SelectDropdown
          buttonStyle={{
            marginTop: Dimensions.get("screen").height / 50,
          }}
          data={classes}
          onSelect={(selectedItem, index) => {
            setClasse(selectedItem);
            getClassFeatures(selectedItem);
          }}
          defaultButtonText={classe ? classe : null}
        />

        {classeDetails && (
          <View style={styles.containerClassFeatures}>
            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              Dé de Vie : {classeDetails.hit_die}
            </Text>

            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              Jet de Savegarde :
            </Text>
            {classeDetails.saving_throws.map((item) => {
              return (
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {item.name}
                </Text>
              );
            })}

            <WeaponMastery darkMode={darkMode} classeDetails={classeDetails} />

            <Proficiencies
              darkMode={darkMode}
              classeDetails={classeDetails}
              bonusMaitrise={bonusMaitrise}
              setBonusMaitrise={setBonusMaitrise}
              setErrorMessage={setErrorMessage}
            />

            <Equipment darkMode={darkMode} classeDetails={classeDetails} />

            <SpellCasting
              darkMode={darkMode}
              classeDetails={classeDetails}
              navigation={navigation}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 6,
    // borderWidth: 3,
    // borderColor: "red",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerClassFeatures: {
    marginTop: 10,
    // width: Dimensions.get("screen").width,
    // paddingHorizontal: Dimensions.get("screen").width / 30,
  },
});

export default ClassComponent;
