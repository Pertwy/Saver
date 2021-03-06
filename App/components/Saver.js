import React, {useState} from "react";
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
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import moment from 'moment';
import ColourButtons from "../components/ColourButtons"

import {logClick, removeSaver, editSaver} from "../Redux/actions"
import {store} from "../Redux/store"
import backup from "../functions/backup"

export default function Saver({
                                Title,
                                Cost,
                                Goal,
                                Colour,
                                Transfer,
                                Addition,
                                id,
                                runningTot,
                                setUpdate
                              }) {
  const [TotalSaved, setTotalSaved] = useState(runningTot);
  const [modalVisible, setModalVisible] = useState(false);
  const [varTitle, setVarTitle] = useState(Title);
  const [varCost, setVarCost] = useState(Cost);
  const [varGoal, setVarGoal] = useState(Goal);
  const [varColour, setVarColour] = useState(Colour)
  const [transferOption, setTransferOption] = useState(Transfer);
  const [varGoalSwitch, setVarGoalSwitch] = useState(true);
  const [formError, setFormError] = useState("");

  const [onePChallangeAmount, setOnePChallangeAmount] = useState(0.00)
  const [onePChallangeSwitch, setOnePChallangeSwitch] = useState(false)
  const [onePChallangeDay, setOnePChallangeDay] = useState(1)

  

  function deleteSaver(){
    store.dispatch(removeSaver(id));
    return setModalVisible(false);
  }

  function handleModal() {
    return setModalVisible(true);
  }

  function handleOnePChallange(){
    setOnePChallangeSwitch(!onePChallangeSwitch)
  }

  function completeEdit(){

    if (varTitle == "" || varCost == "" || varGoal == "")
       {setFormError("All fields must be filled in")
      } else {
      store.dispatch(editSaver(id, varTitle, varCost, varGoalSwitch, varGoal, varColour, transferOption, TotalSaved))
      setModalVisible(false)}
  }

  function handleSaver() {
    if (transferOption == 1) {
      transfer1Alert();``
    } else if (transferOption == 2 && (parseFloat(TotalSaved) + parseFloat(varCost)) > parseFloat(varGoal)) {
      transfer2Alert();
    } else {
      setTotalSaved(parseFloat(TotalSaved) + parseFloat(varCost) + onePChallangeAmount);
    }

    if(onePChallangeSwitch){
      setOnePChallangeAmount(onePChallangeAmount + 0.01)
      setOnePChallangeDay(onePChallangeDay + 1)
    }

    store.dispatch(logClick(moment().format("DD-MM-YY HH:mm:ss"), id, TotalSaved))
    //console.log(store.getState())
    backup()

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
            <AntDesign name="edit" size={30} color="black"/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOnePChallange()}
          style={styles.buttonAreaEdit}
        >
          {onePChallangeSwitch &&(<View>
            <Text style={styles.onePOn}>1p</Text> 
          </View>)}

          {!onePChallangeSwitch &&(<View>
            <Text style={styles.onePOff}>1p</Text> 
          </View>)}

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
            <AntDesign name="edit" size={30} color="black"/>
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

        <TouchableOpacity
          onPress={() => handleOnePChallange()}
          style={styles.buttonAreaEdit}
        >
          {onePChallangeSwitch &&(<View>
            <Text style={styles.onePOn}>1p</Text> 
          </View>)}

          {!onePChallangeSwitch &&(<View>
            <Text style={styles.onePOff}>1p</Text> 
          </View>)}

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
        {
          text: "OK", onPress: () => {
            setTotalSaved(parseFloat(TotalSaved) + parseFloat(varCost));
            Addition()
          }
        },
      ],
      {cancelable: false}
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
        {
          text: "OK", onPress: () => {
            setTotalSaved(parseFloat(TotalSaved) + parseFloat(varCost));
            Addition()
          }
        },
      ],
      {cancelable: false}
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
        {text: "OK", onPress: () => Addition()},
      ],
      {cancelable: false}
    );


  return (
    <View>
      <View style={styles.saver}>
        <TouchableOpacity
          onPress={() => handleSaver()}
          onLongPress={() => handleModal()}
          style={[styles.info, {backgroundColor: varColour}]}
        >
          <View>
            <View style={styles.saverTop}>
              <Text style={styles.saverTopText}>
                {varTitle} - £{(parseFloat(varCost)+onePChallangeAmount).toFixed(2)}
              </Text>
            </View>
            {mainSaverText}
            {onePChallangeSwitch && (
              <View style={styles.saverTop}><Text>Day {onePChallangeDay}</Text></View>
            )}
          </View>
        </TouchableOpacity>

        {rightHandButtons}
      </View>

      <Modal
        style={styles.editModal}
        visible={modalVisible}
        animationType="slide"
      >
        
        <SafeAreaView>
          <ScrollView>
            <View style={styles.editSaverHeading}>
              <Text style={styles.editSaverHeadingText}>EDIT A SAVER</Text>
              <View style={styles.editSaverHeadingButton}>
                <Button
                  title="Close/Done"
                  onPress={() => completeEdit()}
                ></Button>
              </View>
            </View>

            <View style={styles.modalTopText}>
              <Text style={styles.modalTopTextText}>
                Type in the grey areas and click Close/Done to save your
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
                  trackColor={{true: "black", false: "red"}}
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
                      {color: transferOption == 1 ? "white" : "black"},
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
                        {color: transferOption == 2 ? "white" : "black"},
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
                      {color: transferOption == 3 ? "white" : "black"},
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
                      {color: transferOption == 4 ? "white" : "black"},
                    ]}
                  >
                    No Transfer
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <ColourButtons setSaverColour={setVarColour}/>

            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{formError}</Text>
            </View>

            <Button title="Delete Saver" color="red" onPress={() =>deleteSaver()}></Button>
          </ScrollView>
        </SafeAreaView>
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  onePOn:{
    color:"white"
  },
  onePOff:{
    color:"black"
  },
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
    shadowOffset: {width: 6, height: 6},
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
});
