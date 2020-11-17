import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Switch,
  ScrollView,
  Variable,
  ImagePropTypes,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Saver({
  Title,
  Cost,
  Goal,
  onPress,
  Colour,
  GoalSwitch,
  Transfer,
  Delete,
  Addition,
}) {
  const [TotalSaved, setTotalSaved] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [varTitle, setVarTitle] = useState(Title);
  const [varCost, setVarCost] = useState(Cost);
  const [varGoal, setVarGoal] = useState(Goal);
  const [transferOption, setTransferOption] = useState(Transfer);
  const [varGoalSwitch, setVarGoalSwitch] = useState(true);
  const [varTimeAndDateArray, setVarTimeAndDateArray] = useState([]);
  const [varTimeAndDate, setVarTimeAndDate] = useState("");
  const [varSaverRecord, setVarSaverRecord] = useState({
    amount: "",
    date: "",
  });

  function findDate() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setVarTimeAndDate(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  }

  function timeAndDate() {
    findDate();
    setVarSaverRecord({
      ...(varSaverRecord.amount = varCost),
    });
    setVarSaverRecord({
      ...(varSaverRecord.date = varTimeAndDate),
    });
    handleDateAndTime();
  }

  function handleDateAndTime() {
    setVarTimeAndDateArray((varTimeAndDateArray) => [
      ...varTimeAndDateArray,
      varSaverRecord,
    ]);
    console.log(varTimeAndDateArray);
  }

  /*
  setAddSaver({
    ...(addSaver.title = saverTitle),
  });
  setAddSaver({
    ...(addSaver.price = parseFloat(saverAmount).toFixed(2)),
  });*/

  function handleModal() {
    //console.log(varTimeAndDateArray)
    return setModalVisible(true);
  }

  function handleSaver() {
    setTotalSaved(parseFloat(TotalSaved) + parseFloat(varCost));
    timeAndDate();

    if (transferOption == 1) {
      transfer1Alert();
    } else if (transferOption == 2 && TotalSaved >= varGoal) {
      transfer2Alert();
    }

    //console.log(varCost);
  }

  let mainSaverText;

  if (varGoalSwitch == false) {
    mainSaverText = (
      <View style={styles.saverMid}>
        <Text style={styles.saverMidText}>
          £{parseFloat(TotalSaved).toFixed(2)}
        </Text>
      </View>
    );
  }

  if (varGoalSwitch == true) {
    mainSaverText = (
      <View style={styles.saverMid}>
        <Text style={styles.saverMidText}>
          £{parseFloat(TotalSaved).toFixed(2)} / £
          {parseFloat(varGoal).toFixed(2)}
        </Text>
      </View>
    );
  }

  let rightHandButtons;

  if (transferOption == 4) {
    rightHandButtons = (
      <View style={styles.buttonArea}>
        <TouchableOpacity
          onPress={() => handleModal()}
          style={styles.buttonAreaEdit}
        >
          <View>
            <AntDesign name="edit" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (transferOption != 4) {
    rightHandButtons = (
      <View style={styles.buttonArea}>
        <TouchableOpacity
          onPress={() => handleModal()}
          style={styles.buttonAreaEdit}
        >
          <View>
            <AntDesign name="edit" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => transferAlert()}
          style={styles.buttonAreaTransfer}
        >
          <View>
            <MaterialCommunityIcons
              name="bank-transfer-in"
              size={40}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const transfer1Alert = () =>
    Alert.alert(
      "Transfer" + " X Now",
      "Transfer from X to Y",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => Addition() },
      ],
      { cancelable: false }
    );

  const transfer2Alert = () =>
    Alert.alert(
      "Transfer" + " X Now",
      "Transfer X now that you have reached your goal?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => Addition() },
      ],
      { cancelable: false }
    );

  const transferAlert = () =>
    Alert.alert(
      "Transfer",
      "Transfer function not working yet",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => Addition() },
      ],
      { cancelable: false }
    );

  function clickSaver() {
    handleSaver();
    //Addition
  }

  return (
    <View>
      <View style={styles.saver}>
        <TouchableOpacity
          onPress={() => clickSaver()}
          onLongPress={() => handleModal()}
          style={[styles.info, { backgroundColor: Colour }]}
        >
          <View>
            <View style={styles.saverTop}>
              <Text style={styles.saverTopText}>
                {varTitle} - £{varCost}
              </Text>
            </View>
            {mainSaverText}
          </View>
        </TouchableOpacity>

        {rightHandButtons}
      </View>

      <Modal
        style={styles.editModal}
        visible={modalVisible}
        animationType="slide"
      >
        <ScrollView>
          <SafeAreaView>
            <View style={styles.editSaverHeading}>
              <Text style={styles.editSaverHeadingText}>EDIT A SAVER</Text>
              <View style={styles.editSaverHeadingButton}>
                <Button
                  title="Close/Done"
                  onPress={() => setModalVisible(false)}
                ></Button>
              </View>
            </View>

            <View style={styles.modalTopText}>
              <Text style={styles.modalTopTextText}>
                Type in the greay areas and click Close/Done to save your
                changes
              </Text>
            </View>

            <Text style={styles.formQuestions}>
              Edit the name of your Saver
            </Text>
            <TextInput
              onChangeText={(text) => setVarTitle(text)}
              placeholder={varTitle}
              style={styles.formStyle}
            />
            <Text style={styles.formQuestions}>
              Edit the cost of your Saver
            </Text>
            <TextInput
              onChangeText={(text) => setVarCost(parseFloat(text).toFixed(2))}
              placeholder={varCost}
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Edit your goal?</Text>
              <View style={styles.switchView}>
                <Switch
                  trackColor={{ true: "black", false: "red" }}
                  value={varGoalSwitch}
                  onValueChange={(newValue) => setVarGoalSwitch(newValue)}
                />
              </View>
            </View>
            {varGoalSwitch && (
              <TextInput
                onChangeText={(text) => setVarGoal(parseFloat(text).toFixed(2))}
                placeholder={varGoal}
                style={styles.formStyle}
                keyboardType="decimal-pad"
                returnKeyType={"done"}
              />
            )}
            <Text style={styles.formQuestions}>
              Change/reset the total amount saved
            </Text>
            <TextInput
              onChangeText={(text) =>
                setTotalSaved(parseFloat(text).toFixed(2))
              }
              placeholder="Reset amount saved to..."
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Text style={styles.formQuestions}>
              Change when you would like to transfer money
            </Text>
            <View style={styles.transferSchedule}>
              <TouchableOpacity
                style={[
                  styles.transferButton,
                  {
                    backgroundColor: transferOption == 1 ? "black" : "white",
                  },
                ]}
                onPress={() => setTransferOption(1)}
              >
                <View>
                  <Text
                    style={[
                      styles.transferButtonText,
                      { color: transferOption == 1 ? "white" : "black" },
                    ]}
                  >
                    On every click
                  </Text>
                </View>
              </TouchableOpacity>

              {varGoalSwitch && (
                <TouchableOpacity
                  style={[
                    styles.transferButton,
                    {
                      backgroundColor: transferOption == 2 ? "black" : "white",
                    },
                  ]}
                  onPress={() => setTransferOption(2)}
                >
                  <View>
                    <Text
                      style={[
                        styles.transferButtonText,
                        { color: transferOption == 2 ? "white" : "black" },
                      ]}
                    >
                      On achieving your goal
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.transferButton,
                  {
                    backgroundColor: transferOption == 3 ? "black" : "white",
                  },
                ]}
                onPress={() => setTransferOption(3)}
              >
                <View>
                  <Text
                    style={[
                      styles.transferButtonText,
                      { color: transferOption == 3 ? "white" : "black" },
                    ]}
                  >
                    Upon pressing the "transfer" button
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.transferButton,
                  {
                    backgroundColor: transferOption == 4 ? "black" : "white",
                  },
                ]}
                onPress={() => setTransferOption(4)}
              >
                <View>
                  <Text
                    style={[
                      styles.transferButtonText,
                      { color: transferOption == 4 ? "white" : "black" },
                    ]}
                  >
                    No Transfer
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Button title="Delete Saver" color="red" onPress={Delete}></Button>
          </SafeAreaView>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  editModal: {
    maxHeight: "100vh",
  },
  switchQuestion: {
    flexDirection: "row",
  },
  switchView: {
    marginLeft: 210,
    marginTop: 35,
    marginBottom: 6,
  },
  editSaverHeadingText: {
    flex: 1,
    marginLeft: "5%",
    fontSize: 20,
  },
  editSaverHeadingButton: {
    flex: 1,
    //alignContent:"flex-end"
    marginLeft: "12%",
    //paddingLeft: "20%",
  },
  editSaverHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  formQuestions: {
    paddingLeft: "5%",
    marginTop: 35,
  },
  transferButton: {
    //backgroundColor: "white",
    padding: 4,
    margin: 4,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    paddingLeft: "5%",
  },
  transferButtonText: {
    padding: 5,
  },
  transferSchedule: {
    padding: "5%",
  },
  saver: {
    height: 150,
    width: "90%",
    margin: "5%",
    marginTop: 0,
    shadowColor: "black",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    flexDirection: "row",
  },
  info: {
    flex: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonArea: {
    backgroundColor: "rgb(204, 204, 204)",
    flex: 1,
    flexDirection: "column",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonAreaEdit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAreaTransfer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saverTop: {
    //flex: 1,
    paddingLeft: 10,
    paddingTop: 15,
    alignItems: "center",
  },
  saverTopText: {
    fontSize: 15,
    marginTop: 10,
  },
  saverMid: {
    paddingLeft: 10,
    paddingTop: 15,
    alignItems: "center",
  },
  saverMidText: {
    fontSize: 35,
  },

  deleteButton: {
    backgroundColor: "red",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  formStyle: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 35,
    paddingLeft: "5%",
  },
  modalTopText: {
    paddingLeft: "5%",
    paddingTop: 10,
    paddingBottom: 20,
  },
  modalTopTextText: {
    fontSize: 13,
  },
});
