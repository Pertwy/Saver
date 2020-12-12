import React, {useState, useEffect} from "react";
import {Switch} from "native-base";
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
import {FontAwesome} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { AntDesign } from "@expo/vector-icons";

import CardScreenIn from "./CardScreenIn"

import TransferButton from "../components/TransferButton"
import ColourButtons from "../components/ColourButtons"

import {newSaver, firebasePull} from "../Redux/actions";
import {store} from "../Redux/store";

import * as firebase from 'firebase';
import CardInModal from "../components/CardInModal";

import { useSelector, useDispatch } from 'react-redux'

const firebaseConfig = {
  apiKey: "AIzaSyCldOuLQaxZxzblxlNYUzQr0A8FP2PxLQY",
  authDomain: "saverapp-28931.firebaseapp.com",
  databaseURL: "https://saverapp-28931.firebaseio.com",
  projectId: "saverapp-28931",
  storageBucket: "saverapp-28931.appspot.com",
  messagingSenderId: "664778103227",
  appId: "1:664778103227:web:12d27f3872086d73ab4c9e",
  measurementId: "G-MCRZZMKTPE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function SaverScreen({navigation}) {
  const [user, setUser] = useState("John");
  const [totalSaved, setTotalSaved] = useState(0);
  const [saverTitle, setSaverTitle] = useState("");
  const [saverAmount, setSaverAmount] = useState(0);
  const [saverGoal, setSaverGoal] = useState(0);
  const [goalSwitch, setGoalSwitch] = useState(true);
  const [saverColour, setSaverColour] = useState("#FFF7F0");
  const [transferMethod, setTransferMethod] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [informationModalVisible, setInformationModalVisible] = useState(false);
  const [ideaModalVisible, setIdeaModalVisible] = useState(false);
  const [variable, setVariable] = useState(false);
  const [transferMoneyModalVisible, setTransferMoneyModalVisible] = useState(false);
  const [saverList, setSaverList] = useState([]);
  const [newSaverList, setNewSaverList] = useState();
  const [cardsInList, setCardsInList] = useState([]);
  const [optionalText, setOptionalText] = useState(true)
  const [lengthSavers, setLengthSavers] = useState(0)
  const [update, setUpdate] = useState(false)

  const [idCount, setIdCount] = useState(1);
  const [formError, setFormError] = useState(null);

  //const newSaverList = useSelector(store => store.redux.savers)

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

  const unsubscribe = store.subscribe(() => {
    setNewSaverList(store.getState().redux.savers)
  })

  // setLengthSavers(store.getState().redux.savers)
  // if (lengthSavers.length > 0){
  //   setOptionalText(false)}

  // function handleUpdate(){
  //   () => 
  // }

  useEffect(()=>
    unsubscribe
  ,[])

  // function handleUpdate(){
  //   setUpdate(!update)
  //   setNewSaverList(store.getState().redux.savers)
  // }

  function updateAddSaver() {
    if (
      goalSwitch == true &&
      (saverTitle == "" || saverAmount == "" || saverGoal == "")
    ) {
      setFormError("All fields must be filled in");
      //console.log(formError);
    } else {
        store.dispatch(newSaver(idCount, saverTitle, saverAmount, goalSwitch, saverGoal, saverColour, transferMethod))
        setNewSaverList(store.getState().redux.savers)
        unsubscribe()
        console.log(store.getState())
        setIdCount(idCount + 1);
        closeAddModal();
    }
  }

  


  function handleAdd() {
    return setModalVisible(true);
  }

  function handleRefresh(){
    setNewSaverList(store.getState().redux.savers)
  }


  function handleDrawer(){
    navigation.openDrawer();
  }

  const deleteItemById = (id) => {
    const filteredData = saverList.filter((item) => item.id !== id);
    setSaverList(filteredData);
  };

  const addToTotalSaved = (addition) => {
    setTotalSaved(totalSaved + parseFloat(addition));
  };



  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.buttonArea}>

        <TouchableOpacity onPress={handleDrawer}>
          <Feather style={[styles.topButtonsMenu]} name="menu" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.topButtons}>SAVER</Text>

        <TouchableOpacity onPress={handleAdd}>
          <AntDesign style={styles.topButtons} name="pluscircleo" size={32} color="black" />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => setInformationModalVisible(true)}>
          <Text style={styles.topButtons}>S/Text>
        </TouchableOpacity> */}
      

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
                  />
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
                      <IdeaInformationText/>
                      <Button
                        title="Close"
                        onPress={() => setIdeaModalVisible(false)}
                      />
                    </SafeAreaView>
                  </Modal>
                </View>

                <TextInput
                  onChangeText={(text) => setSaverTitle(text)}
                  placeholder="Coffee, Beer, Lunch"
                  style={styles.formStyle}
                  maxLength={20}
                />

                {/*<View style={styles.formQuestionsInfo}>
                  <Text style={styles.formQuestions}>
                    Choose a cost every time you click the Saver
                  </Text>

                  <View style={styles.costSwitchView}>
                    <Switch
                      trackColor={{true: "black", false: "red"}}
                      value={variable}
                      onValueChange={(newValue) => setVariable(newValue)}
                    />
                  </View>
                 </View>*/}

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
                      trackColor={{true: "black", false: "red"}}
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
                      <TransferInformationText/>
                      <Button
                        title="Close"
                        onPress={() => setTransferMoneyModalVisible(false)}
                      />
                    </SafeAreaView>
                  </Modal>
                </View>

                <View style={styles.transferSchedule}>
                  <TransferButton number={1} title="On Every Click" setTransferMethod={setTransferMethod} currentTransfer={transferMethod}/>
                  <TransferButton number={2} title="On achieving your goal" setTransferMethod={setTransferMethod} currentTransfer={transferMethod}/>
                  <TransferButton number={3} title="Upon pressing the transfer button" setTransferMethod={setTransferMethod} currentTransfer={transferMethod}/>
                  <TransferButton number={4} title="No Transfer" setTransferMethod={setTransferMethod} currentTransfer={transferMethod}/> 
                </View>

                <View>
                  <Text style={styles.colorFormQuestions}>
                    Select account details
                  </Text>

                  <View style={styles.accountsContainer}>

                    <TouchableOpacity onPress={() => setInformationModalVisible(true)}>
                        <Text style={styles.topButtons}>Card OUT</Text>
                    </TouchableOpacity>
                    
          {/* Card in Modal */}
                    <Modal
                    style={styles.addModal}
                    visible={informationModalVisible}
                    animationType="slide">
                    <ScrollView>
                      <SafeAreaView style={styles.informationContainer}>
                        <CardScreenIn/>
                        <Button
                          title="Close"
                          onPress={() => setInformationModalVisible(false)}
                        />
                      </SafeAreaView>
                    </ScrollView>
                  </Modal>


                    <FontAwesome name="arrow-right" size={24} color="black"/>

                    <TouchableOpacity onPress={() => setInformationModalVisible(true)}>
                        <Text style={styles.topButtons}>Card IN</Text>
                    </TouchableOpacity>

          {/* Card in Modal */}
                    <Modal
                    style={styles.addModal}
                    visible={informationModalVisible}
                    animationType="slide">
                    <ScrollView>
                      <SafeAreaView style={styles.informationContainer}>
                        <CardScreenIn/>
                        <Button
                          title="Close"
                          onPress={() => setInformationModalVisible(false)}
                        />
                      </SafeAreaView>
                    </ScrollView>
                  </Modal>

                    
                  </View>
                </View>

                <Text style={styles.colorFormQuestions}> Select Saver Colour</Text>
                
                <ColourButtons setSaverColour={setSaverColour}/>
              </View>

              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{formError}</Text>
              </View>

              <Button title="Submit" onPress={updateAddSaver}></Button>

            </SafeAreaView>
          </ScrollView>
        </Modal>
      </SafeAreaView>
      {/* {optionalText && (
      <View style={styles.optionalText}>
        <Text>Add a Saver</Text>
        <Text>Add some accounts</Text>
        <Text>Start Saving</Text>
        {//<Text>Total Transfered: £{totalSaved.toFixed(2)}</Text>
      }</View>)} 
    */}
        <FlatList
          style={{flex: 1}}
          data={newSaverList}
          keyExtractor={(newSaverList) => newSaverList.id.toString()}
          renderItem={({item}) => (
            <Saver
              Title={item.title}
              Cost={item.price}
              Goal={item.goal}
              Colour={item.colour}
              GoalSwitch={item.goalSwitch}
              Transfer={item.transOpt}
              runningTot={item.runningTot}
              Delete={() => deleteItemById(item.id)}
              Addition={() => addToTotalSaved(item.price)}
              Variable={item.variable}
              id = {item.id}
              //setUpdate={handleUpdate()}
            />
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  optionalText: {
    alignItems: "center",
    marginBottom: 10,
  },
  topButtonsMenu:{
    fontSize: 20,
    padding: 10,
    //paddingTop:30
    // marginLeft: -140
    
  },
  topButtons: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 90
  },
  inComingAccount: {
    marginRight: "5%",
    width: "40%",
    height: 50,
    zIndex:-100,
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
  formContainer: {
    //width: "90%",
    //alignItems:"center",
    //flex:1
  },
  transferSchedule: {
    padding: "5%",
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
    // justifyContent: "flex-end",
    justifyContent: "center",
    alignContent: "space-between",

    flex: 1,
    //marginBottom: 15,
    marginTop:15
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
