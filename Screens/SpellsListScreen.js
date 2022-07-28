import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";

import LoadingGetServer from "../Shared/LoadingGetServer";

import { Ionicons } from "@expo/vector-icons";

const SpellListScreen = ({ route, darkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [spellsData, setSpellsData] = useState();
  const [detailSpell, setDetailSpell] = useState();

  const [modalDetails, setModalDetails] = useState(false);

  // console.log(route.params);
  const { classeName } = route.params;

  useEffect(() => {
    const fetchSpellsData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        // const url_server = `http://localhost:3000/spells`;
        const url_server = `http://localhost:3000/spells?classe=${classeName.toLowerCase()}`;

        const response = await axios.get(url_server);
        // console.log(response.data);
        setSpellsData(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchSpellsData();
  }, []);
  return isLoading ? (
    <LoadingGetServer />
  ) : !modalDetails ? (
    <View
      style={[
        darkMode ? themeStyle.dark.container : themeStyle.light.container,
      ]}>
      {errorMessage ? (
        <View>
          <Text style={[themeStyle.title, { color: "red" }]}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {spellsData && (
        <View>
          <Text style={[themeStyle.title, { color: "white" }]}>
            Liste des sorts
          </Text>

          <Button
            title="console"
            onPress={() => {
              console.log(detailSpell);
            }}
          />
          {spellsData.map((classeItem, index) => {
            return (
              <View>
                <Text
                  style={[
                    themeStyle.title,
                    { color: "white", textTransform: "capitalize" },
                  ]}>
                  Classe : {classeItem.classe}
                </Text>
                <FlatList
                  data={classeItem.listOfSpells.sort((a, b) => {
                    return a.level - b.level;
                  })}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            marginVertical: 10,
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            backgroundColor:
                              item.level > 1
                                ? themeStyle.redColor
                                : themeStyle.greenColor,
                          },
                        ]}
                        onPress={() => {
                          setDetailSpell(item);
                          setModalDetails(true);
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flex: 4,
                          }}>
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.text
                            }>
                            {item.name}
                          </Text>
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.text
                            }>
                            Niveau : {item.level}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={[
                            {
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              // width: "20%",
                              flex: 1,
                              paddingLeft: 15,
                            },
                          ]}>
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.text
                            }>
                            Add
                          </Text>
                          <Ionicons
                            name="ios-add-circle-outline"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  }}
                  key={index}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  ) : (
    <ScrollView
      style={[
        darkMode ? themeStyle.dark.container : themeStyle.light.container,
      ]}>
      <TouchableOpacity
        onPress={() => {
          setModalDetails(false);
        }}>
        <Text style={[themeStyle.title, { color: "white" }]}>Close</Text>
      </TouchableOpacity>
      {detailSpell && (
        <View style={{ padding: 10 }}>
          <Text
            style={[
              darkMode ? themeStyle.dark.text : themeStyle.light.text,
              themeStyle.title,
            ]}>
            {detailSpell.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text
              style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
              {`Niveau :  ${detailSpell.level}`}
            </Text>
            {detailSpell.data.range ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Portée : {detailSpell.data.range}
              </Text>
            ) : null}
            {detailSpell.data.school ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Ecole : {detailSpell.data.school.name}
              </Text>
            ) : null}
            {detailSpell.data.attack_type ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Type de l'attaque : {detailSpell.data.attack_type}
              </Text>
            ) : null}

            {detailSpell.data.dc ? (
              <>
                <Text
                  style={[
                    darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  ]}>
                  Jet de sauvegarde : {detailSpell.data.dc.dc_type.name}
                </Text>

                <Text
                  style={[
                    darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  ]}>
                  Difficulté : {detailSpell.data.dc.dc_success}
                </Text>
                {detailSpell.data.dc.desc ? (
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                    ]}>
                    Description jet de sauvegarde : {detailSpell.data.dc.desc}
                  </Text>
                ) : null}
              </>
            ) : null}

            {detailSpell.data.area_of_effect ? (
              <>
                <Text
                  style={[
                    darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  ]}>
                  Type de la zone d'effet:{" "}
                  {detailSpell.data.area_of_effect.type}
                </Text>
                <Text
                  style={[
                    darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  ]}>
                  {`Portée de la zone d'effet : ${detailSpell.data.area_of_effect.size}`}
                </Text>
              </>
            ) : null}

            {detailSpell.data.duration ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Durée du sorts : {detailSpell.data.duration}
              </Text>
            ) : null}
            {detailSpell.data.casting_time ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Temps d'incantation : {detailSpell.data.casting_time}
              </Text>
            ) : null}
            {detailSpell.data.rituel ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Rituel possible
              </Text>
            ) : (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Rituel pas possible
              </Text>
            )}
            {detailSpell.data.concentration ? (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Concentration nécessaire
              </Text>
            ) : (
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Concentration non nécessaire
              </Text>
            )}
          </View>

          {detailSpell.data.dc ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Jet de sauvegarde
              </Text>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Jet de sauvegarde : {detailSpell.data.dc.dc_type.name}
              </Text>

              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                ]}>
                Difficulté : {detailSpell.data.dc.dc_success}
              </Text>
              {detailSpell.data.dc.desc ? (
                <Text
                  style={[
                    darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  ]}>
                  Description jet de sauvegarde : {detailSpell.data.dc.desc}
                </Text>
              ) : null}
            </View>
          ) : null}

          {detailSpell.data.higher_level.length > 0 ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                A plus haut niveau :
              </Text>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {detailSpell.data.higher_level}
              </Text>
            </View>
          ) : null}

          {detailSpell.data.components ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Incantation :
              </Text>
              {detailSpell.data.components.map((component, index) => {
                if (component === "V") {
                  return (
                    <Text
                      style={[
                        darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      ]}>
                      - Verbal
                    </Text>
                  );
                } else if (component === "S") {
                  return (
                    <Text
                      style={[
                        darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      ]}>
                      - Somatique
                    </Text>
                  );
                } else if (component === "M") {
                  return (
                    <Text
                      style={[
                        darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      ]}>
                      - Matériel
                    </Text>
                  );
                }
              })}
            </View>
          ) : null}

          {detailSpell.data.material ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Materiel nécessaire à l'incantation :
              </Text>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {detailSpell.data.material}
              </Text>
            </View>
          ) : null}

          {detailSpell.data.damage ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Dégats :
              </Text>
              {detailSpell.data.damage.damage_type ? (
                <Text
                  style={
                    darkMode ? themeStyle.dark.text : themeStyle.light.text
                  }>
                  {detailSpell.data.damage.damage_type.name}
                </Text>
              ) : null}

              {detailSpell.data.damage.damage_at_character_level ? (
                <View>
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      themeStyle.title,
                    ]}>
                    Dommage par niveau de personnage :
                  </Text>
                  {Object.keys(
                    detailSpell.data.damage.damage_at_character_level
                  ).map((item) => {
                    return (
                      <Text
                        style={
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text
                        }>{`Niveau ${item} ${detailSpell.data.damage.damage_at_character_level[item]}`}</Text>
                    );
                  })}
                </View>
              ) : null}

              {detailSpell.data.damage.damage_at_slot_level ? (
                <View>
                  <Text
                    style={[
                      darkMode ? themeStyle.dark.text : themeStyle.light.text,
                      themeStyle.title,
                    ]}>
                    Dommage par niveau de sort :
                  </Text>
                  {Object.keys(
                    detailSpell.data.damage.damage_at_slot_level
                  ).map((item) => {
                    return (
                      <Text
                        style={
                          darkMode
                            ? themeStyle.dark.text
                            : themeStyle.light.text
                        }>{`Niveau ${item} ${detailSpell.data.damage.damage_at_slot_level[item]}`}</Text>
                    );
                  })}
                </View>
              ) : null}
            </View>
          ) : null}

          {detailSpell.data.desc.length > 0 ? (
            <View>
              <Text
                style={[
                  darkMode ? themeStyle.dark.text : themeStyle.light.text,
                  themeStyle.title,
                ]}>
                Description
              </Text>
              <Text
                style={darkMode ? themeStyle.dark.text : themeStyle.light.text}>
                {detailSpell.data.desc}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </ScrollView>
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

export default SpellListScreen;
