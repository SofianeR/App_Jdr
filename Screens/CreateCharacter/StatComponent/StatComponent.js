import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { DraxProvider, DraxView } from "react-native-drax";

const StatComponent = ({ darkMode, characteristics, setCharacteristics }) => {
  const [charactValues, setCharactValues] = useState([]);
  const [singleDiceThrowValues, setSingleDiceThrowValues] = useState([]);

  const [alertMessage, setAlertMessage] = useState(false);

  const diceThrowMultiple = () => {
    const copyCharactValues = [];

    for (let i = 0; i < 6; i++) {
      let arrayOfValueToSum = [];

      for (let i = 0; i < 4; i++) {
        arrayOfValueToSum.push(Math.floor(Math.random() * (7 - 2) + 2));
      }

      arrayOfValueToSum.shift();

      const sum = arrayOfValueToSum.reduce((prevSum, num) => prevSum + num, 0);

      copyCharactValues.push(sum);

      setCharactValues(copyCharactValues);
    }
  };

  const diceThrowSingle = () => {
    let copySingleDiceValues = [...singleDiceThrowValues];

    if (copySingleDiceValues.length < 4) {
      copySingleDiceValues.push(Math.floor(Math.random() * (6 - 1) + 1));
      copySingleDiceValues.sort();
    } else if (copySingleDiceValues.length === 4) {
      copySingleDiceValues.shift();

      const sum = copySingleDiceValues.reduce(
        (prevSum, num) => prevSum + num,
        0
      );

      const copyCharactValues = [...charactValues];

      const copyCharacteristics = [...characteristics];

      let numberCharacteristicsSet = 0;

      copyCharacteristics.map((item) => {
        if (item.value) {
          numberCharacteristicsSet += 1;
        }
      });
      const checkForNumber =
        copyCharactValues.length + numberCharacteristicsSet;
      if (checkForNumber < 6) {
        copyCharactValues.push(sum);

        setCharactValues(copyCharactValues);

        copySingleDiceValues = [];

        copySingleDiceValues.push(Math.floor(Math.random() * (6 - 1) + 1));
      } else {
        setAlertMessage(true);
      }
    }

    setSingleDiceThrowValues(copySingleDiceValues);
  };
  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {charactValues.length <= 0 && singleDiceThrowValues.length <= 0 ? (
        <Text
          style={{
            fontWeight: "bold",
            color: themeStyle.blueColor,
            fontSize: 20,
            marginTop: Dimensions.get("screen").height / 40,
          }}>
          Caractéristiques et modificateurs
        </Text>
      ) : null}
      <Button
        title="console"
        onPress={() => {
          const copyCharacteristics = [...characteristics];

          let checkIfFull = true;

          copyCharacteristics.map((item) => {
            if (!item.value) {
              checkIfFull = false;
            }
          });
          // console.log(checkIfFull);
        }}
      />

      {alertMessage ? (
        <View style={styles.modalAlert}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: themeStyle.blueColor,
              textAlign: "center",
            }}>
            Vous avez déja 6 caractéristiques, recommencer une série de 6
            caractéristiques ?
          </Text>

          <View
            style={{
              // width: Dimensions.get("screen").width,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.diceThrowButtonView}
              onPress={() => {
                const copyCharactValues = [];
                setCharactValues(copyCharactValues);

                const copyCharacteristics = [...characteristics];

                copyCharacteristics.map((item) => {
                  item.value = 0;
                  item.modificateur = 0;
                });

                setCharacteristics(copyCharacteristics);

                setAlertMessage(false);
              }}>
              <Text style={styles.diceThrowButton}>OUI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.diceThrowButtonView}
              onPress={() => {
                setAlertMessage(false);
              }}>
              <Text style={styles.diceThrowButton}>NON</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <DraxProvider
        style={[{ flex: 1 }, alertMessage ? { opacity: 0.1 } : { opacity: 1 }]}>
        {charactValues && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: Dimensions.get("screen").width,
            }}>
            {charactValues.map((charactValue, index) => {
              return (
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={charactValue}
                  longPressDelay={0}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}>
                    {charactValue}
                  </Text>
                </DraxView>
              );
            })}
          </View>
        )}
        {singleDiceThrowValues && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: Dimensions.get("screen").width,
            }}>
            {singleDiceThrowValues.map((diceValue, index) => {
              return (
                <View
                  style={{
                    marginTop: Dimensions.get("screen").height / 40,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderColor: themeStyle.blueColor,
                    backgroundColor: index > 0 ? "#06C2A3" : "#FF7B6F",
                    borderRadius: "50%",
                  }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}>
                    {diceValue}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.Stat}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
              {singleDiceThrowValues[singleDiceThrowValues.length - 1]}
            </Text>
          </View>
          <View style={styles.containerStat}>
            {characteristics &&
              characteristics.map((item, index) => {
                // const keys = Object.keys(item).join("");
                const element = item;
                return (
                  <DraxView
                    style={styles.receivingValueZone}
                    receivingStyle={styles.receiving}
                    renderContent={({ viewState }) => {
                      const receivingDrag =
                        viewState && viewState.receivingDrag;
                      const payload = receivingDrag && receivingDrag.payload;
                      return (
                        <TouchableOpacity
                          style={styles.statView}
                          onPress={() => {
                            const copyCharactValues = [...charactValues];
                            const copyCharacteristics = [...characteristics];

                            if (item.value) {
                              if (copyCharactValues.length < 6) {
                                copyCharactValues.push(item.value);
                                setCharactValues(copyCharactValues);

                                copyCharacteristics[index].value = 0;
                                copyCharacteristics[index].modificateur = 0;

                                setCharacteristics(copyCharacteristics);
                              }
                            }
                          }}>
                          <TextInput
                            keyboardType="numeric"
                            value={item.value.toString()}
                            style={styles.inputCharact}
                            onChangeText={(value) => {
                              const copyCharacteristics = [...characteristics];

                              if (value > 20) {
                                item.value = "20";
                                item.modificateur = Math.floor(
                                  (Number(item.value) - 10) / 2
                                );
                              } else {
                                item.value = value;
                                item.modificateur = Math.floor(
                                  (Number(item.value) - 10) / 2
                                );
                              }

                              setCharacteristics(copyCharacteristics);
                            }}
                          />
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.thext
                            }>
                            {item.modificateur > 0 && "+ "}
                            {item.modificateur}
                          </Text>
                          <Text
                            style={
                              darkMode
                                ? themeStyle.dark.text
                                : themeStyle.light.thext
                            }>
                            {item.abbr}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    onReceiveDragDrop={(event) => {
                      if (!item.value) {
                        const copyCharactValues = [...charactValues];

                        const indexToSplice = copyCharactValues.indexOf(
                          event.dragged.payload
                        );
                        copyCharactValues.splice(indexToSplice, 1);

                        setCharactValues(copyCharactValues);

                        const copyCharacteristics = [...characteristics];

                        item.value = event.dragged.payload;
                        item.modificateur = Math.floor(
                          (Number(item.value) - 10) / 2
                        );

                        setCharacteristics(copyCharacteristics);
                      }
                    }}></DraxView>
                );
              })}
          </View>
        </View>
      </DraxProvider>
      <View
        style={[
          styles.diceContainer,
          alertMessage ? { opacity: 0.1 } : { opacity: 1 },
        ]}>
        <TouchableOpacity
          style={styles.diceThrowButtonView}
          onPress={diceThrowMultiple}>
          <Text style={styles.diceThrowButton}>Lancer 6 dés !</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.diceThrowButtonView}
          onPress={diceThrowSingle}>
          <Text style={styles.diceThrowButton}>Lancer un dé !</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const themeStyle = require("../../../Styles/ThemeMode");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    // height:
    //   Dimensions.get("screen").height - Dimensions.get("screen").height / 6,
  },
  Stat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  containerStat: {
    // borderColor: "orange",
    // borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "50%",
  },

  receivingValueZone: {
    borderRadius: 10,
    width: "45%",
    marginVertical: 5,

    backgroundColor: themeStyle.blueColor,
    padding: 5,
  },

  statView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  inputCharact: {
    color: themeStyle.blueColor,
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "white",
    width: "100%",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
  },
  diceContainer: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  diceThrowButtonView: {
    borderColor: themeStyle.blueColor,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    backgroundColor: themeStyle.blueColor,
  },
  diceThrowButton: {
    color: "white",
    fontWeight: "bold",
  },
  // DRAXVIEW STYLE IMPORT

  supprValue: {
    borderColor: "white",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    height: Dimensions.get("screen").height / 10,
    alignItems: "center",
    justifyContent: "center",
  },

  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  receivingZone: {
    // height: 200,
    flex: 1,
    borderRadius: 10,
  },
  receiving: {
    borderColor: "#06C2A3",
    borderWidth: 2,
    backgroundColor: "#06C2A3",
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  palette: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  draggableBox: {
    padding: 15,
    borderRadius: "50%",
    // marginHorizontal: "2%",
    backgroundColor: themeStyle.blueColor,
    marginTop: 10,
  },
  green: {
    backgroundColor: "#aaffaa",
  },
  blue: {
    backgroundColor: "#aaaaff",
  },
  red: {
    backgroundColor: "#ffaaaa",
  },

  cyan: {
    backgroundColor: "#aaffff",
  },

  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "white",
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },

  // Modal Alert

  modalAlert: {
    position: "absolute",
    top: Dimensions.get("screen").height / 4,

    zIndex: 1000,
    borderColor: themeStyle.blueColor,
    borderWidth: 2,
    padding: 20,
    backgroundColor: "white",
  },
});

export default StatComponent;
