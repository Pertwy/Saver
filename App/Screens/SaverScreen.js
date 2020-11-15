import React, { useState, useEffect } from "react";
import { Switch } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Saver from "../components/Saver";
import InformationText from "../components/InformationText";
import TransferInformationText from "../components/TransferInformationText";
import IdeaInformationText from "../components/IdeaInformationText";
import { FontAwesome } from "@expo/vector-icons";

//import * as firebase from "firebase/app";
//import "firebase/auth";

//var firebaseapp = require('firebase/app');
//require("firebase/auth");
//require("firebase/database");
/*
if (firebase.apps.length === 0) {
  firebase.initializeApp({ firebaseConfig });
}
*/

const firebaseConfig = {
  apiKey: "AIzaSyCldOuLQaxZxzblxlNYUzQr0A8FP2PxLQY",
  authDomain: "saverapp-28931.firebaseapp.com",
  databaseURL: "https://saverapp-28931.firebaseio.com",
  projectId: "saverapp-28931",
  storageBucket: "saverapp-28931.appspot.com",
  messagingSenderId: "664778103227",
  appId: "1:664778103227:web:12d27f3872086d73ab4c9e",
  measurementId: "G-MCRZZMKTPE",
};

export default function SaverScreen({ navigation }) {
  const [totalSaved, setTotalSaved] = useState(0);
  const [saverTitle, setSaverTitle] = useState("");
  const [saverAmount, setSaverAmount] = useState("");
  const [saverGoal, setSaverGoal] = useState("");
  const [goalSwitch, setGoalSwitch] = useState(true);
  const [saverColour, setSaverColour] = useState("#FFF7F0");
  const [transferMethod, setTransferMethod] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [informationModalVisible, setInformationModalVisible] = useState(false);
  const [ideaModalVisible, setIdeaModalVisible] = useState(false);
  const [variable, setVariable] = useState(false);
  const [counter, setCounter] = useState(0);
  const [transferMoneyModalVisible, setTransferMoneyModalVisible] = useState(
    false
  );
  const [saverList, setSaverList] = useState([]);
  const [idCount, setIdCount] = useState(1);
  const [formError, setFormError] = useState(null);
  const [addSaver, setAddSaver] = useState({
    id: "",
    title: "",
    price: 0,
    goal: 0,
    goalSwitch: true,
    colour: "#FFF7F0",
    transfer: 1,
  });

  let noSaver;

  if (saverList.length < 1 || saverList == undefined) {
    noSaver = <Text>Click "Add Saver" to get started</Text>;
  }

  /*//   Upload Function   ///////////////
  function storeSomething(saverTitle, saverAmount) {
    firebase
      .database()
      .ref("Title/" + saverTitle)
      .set({
        Amount: saverAmount,
      });
  }*/

  /*  Download function ////////////////////

  setupHighscoreListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }


const issue = await getIssue()
const owner = await getOwner(issue.ownerId)
await sendEmail(owner.email, `Some text #${issue.number}`) // tiny change here
*/

  function closeAddModal() {
    setSaverTitle("");
    setSaverGoal("");
    setSaverAmount("");
    setSaverColour("#FFF7F0");
    setFormError(null);
    setModalVisible(false);
    setGoalSwitch(true);
    setTransferMethod(1);
  }

  function updateAddSaver() {
    if (
      goalSwitch == true &&
      (saverTitle == "" || saverAmount == "" || saverGoal == "")
    ) {
      setFormError("All fields must be filled in");
      //console.log(formError);
    } else {
      setAddSaver({
        ...(addSaver.title = saverTitle),
      });
      setAddSaver({
        ...(addSaver.price = parseFloat(saverAmount).toFixed(2)),
      });
      setAddSaver({
        ...(addSaver.goal = parseFloat(saverGoal).toFixed(2)),
      });
      setAddSaver({
        ...(addSaver.id = idCount),
      });
      setAddSaver({
        ...(addSaver.colour = saverColour),
      });
      setAddSaver({
        ...(addSaver.goalSwitch = goalSwitch),
      });
      setAddSaver({
        ...(addSaver.transfer = transferMethod),
      });
      handleSaverList();
      //console.log(saverList);
      setIdCount(idCount + 1);
      setModalVisible(false);
      setFormError(null);
      setSaverTitle("");
      setSaverGoal("");
      setSaverAmount("");
      setSaverColour("#FFF7F0");
      setGoalSwitch(true);
      setTransferMethod(1);
      //storeSomething(saverTitle, saverAmount);
    }
  }

  function handleSaverList() {
    setSaverList((saverList) => [...saverList, addSaver]);
    
  }

  function handleAdd() {
    return setModalVisible(true);
  }
  function handleInfo() {
    //console.log(saverList)
    return setInformationModalVisible(true);
  }

  deleteItemById = (id) => {
    const filteredData = saverList.filter((item) => item.id !== id);
    setSaverList(filteredData);
    //console.log(id);
    //setTotalSaved(totalSaved + id);
    //console.log(totalSaved);
  };

  addToTotalSaved = (addition) => {
    setTotalSaved(totalSaved + parseFloat(addition));
    console.log(totalSaved);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.buttonArea}>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.topButtons}>ADD SAVER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInfo}>
          <Text style={styles.topButtons}>INFORMATION</Text>
        </TouchableOpacity>

        {/*<Button
          color="black"
          title="Login Screen"
          onPress={() => navigation.navigate("Card")}
        />*/}
        <Modal
          style={styles.addModal}
          visible={informationModalVisible}
          animationType="slide"
        >
          <ScrollView>
            <SafeAreaView style={styles.informationContainer}>
              <InformationText />
              <Button
                title="Close"
                onPress={() => setInformationModalVisible(false)}
              ></Button>
            </SafeAreaView>
          </ScrollView>
        </Modal>

        <Modal
          style={styles.addModal}
          visible={modalVisible}
          animationType="slide"
        >
          <ScrollView>
            <SafeAreaView>
              <View style={styles.addSaverHeading}>
                <Text style={styles.addSaverHeadingText}>ADD A SAVER</Text>
                <View style={styles.addSaverHeadingButton}>
                  <Button
                    title="Close"
                    onPress={() => closeAddModal()}
                  ></Button>
                </View>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.formQuestionsInfo}>
                  <Text style={styles.formQuestions}>
                    What would you like to save money on?
                  </Text>

                  <TouchableOpacity onPress={() => setIdeaModalVisible(true)}>
                    <View style={styles.formQuestionsInfoBox}>
                      <Text style={styles.formQuestionsInfoText}>Ideas</Text>
                    </View>
                  </TouchableOpacity>

                  <Modal visible={ideaModalVisible} animationType="slide">
                    <SafeAreaView>
                      <IdeaInformationText />
                      <Button
                        title="Close"
                        onPress={() => setIdeaModalVisible(false)}
                      ></Button>
                    </SafeAreaView>
                  </Modal>
                </View>

                <TextInput
                  onChangeText={(text) => setSaverTitle(text)}
                  placeholder="Coffee, Beer, Lunch"
                  style={styles.formStyle}
                  maxLength={20}
                />

                <View style={styles.formQuestionsInfo}>
                  <Text style={styles.formQuestions}>
                    Choose a cost every time you click the Saver
                  </Text>

                  <View style={styles.costSwitchView}>
                    <Switch
                      trackColor={{ true: "black", false: "red" }}
                      value={variable}
                      onValueChange={(newValue) => setVariable(newValue)}
                    />
                  </View>
                </View>

                {!variable && (
                  <View>
                    <Text style={styles.formQuestions}>
                      How much does that cost?
                    </Text>

                    <TextInput
                      onChangeText={(text) => setSaverAmount(text)}
                      placeholder="£3.50"
                      style={styles.formStyle}
                      keyboardType="decimal-pad"
                      returnKeyType={"done"}
                    />
                  </View>
                )}

                <View style={styles.switchQuestion}>
                  <Text style={styles.formQuestions}>
                    Would you like to set a savings goal?
                  </Text>
                  <View style={styles.switchView}>
                    <Switch
                      trackColor={{ true: "black", false: "red" }}
                      value={goalSwitch}
                      onValueChange={(newValue) => setGoalSwitch(newValue)}
                    />
                  </View>
                </View>
                {goalSwitch && (
                  <TextInput
                    onChangeText={(text) => setSaverGoal(text)}
                    placeholder="£100"
                    style={styles.formStyle}
                    keyboardType="decimal-pad"
                    returnKeyType={"done"}
                  />
                )}

                <View style={styles.formQuestionsInfo}>
                  <Text style={styles.formQuestions}>
                    When would you like to transfer money?
                  </Text>
                  <TouchableOpacity
                    onPress={() => setTransferMoneyModalVisible(true)}
                  >
                    <View style={styles.formQuestionsInfoBox}>
                      <Text style={styles.formQuestionsInfoText}>Info</Text>
                    </View>
                  </TouchableOpacity>

                  <Modal
                    visible={transferMoneyModalVisible}
                    animationType="slide"
                  >
                    <SafeAreaView>
                      <TransferInformationText />
                      <Button
                        title="Close"
                        onPress={() => setTransferMoneyModalVisible(false)}
                      ></Button>
                    </SafeAreaView>
                  </Modal>
                </View>

                <View style={styles.transferSchedule}>
                  <TouchableOpacity
                    style={[
                      styles.transferButton,
                      {
                        backgroundColor:
                          transferMethod == 1 ? "black" : "white",
                      },
                    ]}
                    onPress={() => setTransferMethod(1)}
                  >
                    <View>
                      <Text
                        style={[
                          styles.transferButtonText,
                          { color: transferMethod == 1 ? "white" : "black" },
                        ]}
                      >
                        On every click
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {goalSwitch && (
                    <TouchableOpacity
                      style={[
                        styles.transferButton,
                        {
                          backgroundColor:
                            transferMethod == 2 ? "black" : "white",
                        },
                      ]}
                      onPress={() => setTransferMethod(2)}
                    >
                      <View>
                        <Text
                          style={[
                            styles.transferButtonText,
                            { color: transferMethod == 2 ? "white" : "black" },
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
                        backgroundColor:
                          transferMethod == 3 ? "black" : "white",
                      },
                    ]}
                    onPress={() => setTransferMethod(3)}
                  >
                    <View>
                      <Text
                        style={[
                          styles.transferButtonText,
                          { color: transferMethod == 3 ? "white" : "black" },
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
                        backgroundColor:
                          transferMethod == 4 ? "black" : "white",
                      },
                    ]}
                    onPress={() => setTransferMethod(4)}
                  >
                    <View>
                      <Text
                        style={[
                          styles.transferButtonText,
                          { color: transferMethod == 4 ? "white" : "black" },
                        ]}
                      >
                        No Transfer
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.colorFormQuestions}>
                    Select account details
                  </Text>

                  <View style={styles.accountsContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Card")}
                      style={styles.outGoingAccount}
                    >
                      <View>
                        <Text>Select outgoing account</Text>
                      </View>
                    </TouchableOpacity>

                    <FontAwesome name="arrow-right" size={24} color="black" />
                    <View style={styles.inComingAccount}>
                      <Text>Select incoming account</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.colorFormQuestions}>
                  Select Saver Colour
                </Text>
                <View style={styles.circleContainer}>
                  <TouchableOpacity
                    style={[styles.Circle, styles.red]}
                    onPress={() => setSaverColour("rgb(238, 64, 53)")}
                  />
                  <TouchableOpacity
                    style={[styles.Circle, styles.orange]}
                    onPress={() => setSaverColour("rgb(243, 119, 54)")}
                  />
                  <TouchableOpacity
                    style={[styles.Circle, styles.yellow]}
                    onPress={() => setSaverColour("rgb(253, 244, 152)")}
                  />
                  <TouchableOpacity
                    style={[styles.Circle, styles.green]}
                    onPress={() => setSaverColour("rgb(123, 192, 67)")}
                  />
                  <TouchableOpacity
                    style={[styles.Circle, styles.blue]}
                    onPress={() => setSaverColour("rgb(3, 146, 207)")}
                  />
                </View>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{formError}</Text>
              </View>
              <Button title="Submit" onPress={updateAddSaver}></Button>
            </SafeAreaView>
          </ScrollView>
        </Modal>
      </SafeAreaView>
      <View style={styles.optionalText}>
        {noSaver}
        <Text>Total Transfered: £{totalSaved.toFixed(2)}</Text>
      </View>
      <SafeAreaView style={styles.saverArea}>
        <FlatList
          nestedScrollEnabled
          data={saverList}
          keyExtractor={(saverList) => saverList.id.toString()}
          renderItem={({ item }) => (
            <Saver
              Title={item.title}
              Cost={item.price}
              Goal={item.goal}
              Colour={item.colour}
              GoalSwitch={item.goalSwitch}
              Transfer={item.transfer}
              Delete={() => deleteItemById(item.id)}
              //onPress={() => handleDeleteSaverList(item)}
              Addition={() => addToTotalSaved(item.price)}
              Variable={item.variable}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionalText: {
    alignItems: "center",
    marginBottom: 10,
  },
  topButtons: {
    fontSize: 20,
    padding: 10,
  },
  inComingAccount: {
    marginRight: "5%",
    width: "40%",
    height: 50,
    backgroundColor: "#ccc",
  },
  outGoingAccount: {
    marginLeft: "5%",
    width: "40%",
    height: 50,
    backgroundColor: "#ccc",
  },
  accountsContainer: {
    flexDirection: "row",
  },
  listcontainer: {
    width: "100%",
  },
  addModal: {
    maxHeight: "100vh",
  },
  addSaverHeadingText: {
    flex: 1,
    marginLeft: "5%",
    fontSize: 20,
  },
  addSaverHeadingButton: {
    flex: 1,
    marginLeft: "12%",
  },
  addSaverHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  formQuestionsInfoText: {
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
  },
  formQuestionsInfoBox: {
    backgroundColor: "black",
    marginTop: 30,
    marginLeft: 30,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  formQuestionsInfo: {
    flexDirection: "row",
  },
  switchQuestion: {
    flexDirection: "row",
  },
  formQuestions: {
    paddingLeft: "5%",
    marginTop: 35,
  },
  colorFormQuestions: {
    paddingLeft: "5%",
    marginTop: 15,
  },
  switchView: {
    marginLeft: 60,
    marginTop: 35,
    marginBottom: 6,
  },
  costSwitchView: {
    marginLeft: 10,
    marginTop: 35,
    marginBottom: 6,
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
    //color: "green"
  },
  formContainer: {
    //width: "90%",
    //alignItems:"center",
    //flex:1
  },
  transferSchedule: {
    padding: "5%",
  },
  container: {
    flex: 1,
  },

  headerText: {
    padding: 20,
    fontSize: 20,
  },
  header: {
    alignItems: "center",
    padding: 5,
  },
  buttonArea: {
    maxHeight: "10%",
    flexDirection: "row",
    justifyContent: "flex-end",
    justifyContent: "center",
    flex: 1,
    marginBottom: 15,
  },
  saverArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 13,
    width: "100%",
    height: "80%",
  },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },

  formStyle: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: "5%",
  },

  circleContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  },
  Circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  red: {
    backgroundColor: "rgb(238, 64, 53)",
  },
  orange: {
    backgroundColor: "rgb(243, 119, 54)",
  },
  yellow: {
    backgroundColor: "rgb(253, 244, 152)",
  },
  green: {
    backgroundColor: "rgb(123, 192, 67)",
  },
  blue: {
    backgroundColor: "rgb(3, 146, 207)",
  },
  informationContainer: {
    paddingTop: 10,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {},
});
