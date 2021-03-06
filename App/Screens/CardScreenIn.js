import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Cards from "../components/Cards";
import * as firebase from 'firebase';
import {newCardOut, newCardIn, newCardInView, plusCardId, pageUpdate} from "../Redux/actions";
import {store} from "../Redux/store";
import WarningText from "../components/WarningText"

export default function CardScreenIn(props) {
  const [addCardSwitch, setAddCardSwitch] = useState(false);
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [newCardListIn, setNewCardListIn] = useState([])
  const [newCardListOut, setNewCardListOut] = useState([])

  function handelChange(){
    setNewCardListIn(store.getState().redux.cardsIn)
    setNewCardListOut(store.getState().redux.cardsOut)
    setIdCounter(store.getState().redux.cardId)
  }

  const unsubscribe = store.subscribe(handelChange)

  useEffect(()=>{
    store.dispatch(pageUpdate())
    unsubscribe
  },[])



  let addSubtract;
  if (addCardSwitch == true) {
    addSubtract = <AntDesign name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitch == false) {
    addSubtract = <AntDesign name="pluscircleo" size={32} color="black" />;
  }

  function viewAddCard() {
    if (addCardSwitch == false) {
      setAddCardSwitch(true);
    }
    if (addCardSwitch == true) {
      setAddCardSwitch(false);
    }
  }

  function addCard() {
    setAddCardSwitch(false);
    store.dispatch(newCardOut(accountNumber,sortCode,accountName, idCounter))
    setNewCardListOut(store.getState().redux.cardsOut)
    unsubscribe()
    setIdCounter(idCounter + 1);
  }

  const [addCardSwitchIn, setAddCardSwitchIn] = useState(false);
  const [sortCodeIn, setSortCodeIn] = useState("");
  const [accountNumberIn, setAccountNumberIn] = useState("");
  const [accountNameIn, setAccountNameIn] = useState("");

  let addSubtractIn;
  if (addCardSwitchIn == true) {
    addSubtractIn = <AntDesign style={styles.topButtons} name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitchIn == false) {
    addSubtractIn = <AntDesign style={styles.topButtons} name="pluscircleo" size={32} color="black" />;
  }

  function viewAddCardIn() {
    if (addCardSwitchIn == false) {
      setAddCardSwitchIn(true);
    }
    if (addCardSwitchIn == true) {
      setAddCardSwitchIn(false);
    }
  }

  function addCardIn() {
    setAddCardSwitchIn(false);
    unsubscribe()
    store.dispatch(newCardIn(accountNumberIn,sortCodeIn,accountNameIn, idCounter, "cardsIn"))
    setNewCardListIn(store.getState().redux.cardsIn)
    
    console.log(store.getState())
    store.dispatch(plusCardId())
  }

  function handleRefresh(){
    setNewCardListIn(store.getState().redux.cardsIn)
    setNewCardListOut(store.getState().redux.cardsOut)
  }

  function handleDrawer(){
    navigation.openDrawer();
  }

  function handleClose(){
    props.setCardInModal(false)
  }

  return (
    <View>
        <SafeAreaView style={styles.container}>

        <View style={styles.buttonArea}>

          <TouchableOpacity onPress={() => handleClose()}>
            <AntDesign name="checkcircleo" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.topButtons}>INCOMING</Text>

          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
        </View>
         
        {/* <WarningText/> */}

        <FlatList
          //style={{flex: 1}}
          data={newCardListIn}
          keyExtractor={(newCardListIn) => newCardListIn.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
              id = {item.id}
              inOut = "cardsIn"
              select = {true}
            />
          )}
        />


        {addCardSwitchIn && (
          <View>
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Give the card a name</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNameIn(text)}
              placeholder="Current account"
              placeholderTextColor = "#D3D3D3"
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNumberIn(text)}
              placeholder="XXXXXXXX"
              placeholderTextColor = "#D3D3D3"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setSortCodeIn(text)}
              placeholder="XX-XX-XX"
              placeholderTextColor = "#D3D3D3"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Add" onPress={() => addCardIn()}></Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  informationText: {
    paddingTop: 4,
  },
  addCardText: {
    paddingLeft: "5%",
    fontSize: 20,
  },
  container: {
    marginLeft: "10%",
    //marginRight: "5%",
  },
  addCard: {
    flexDirection: "row",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "black",
    paddingTop: 7,
    paddingBottom: 5,
    alignItems: "center",
  },
  headingElement: {
    marginTop: 40,
    marginBottom: 0,
    flexDirection:"row",
    alignItems:"center",
    //alignContent:"center",
    //justifyContent:"center"
  },
  headingTopElement: {
    alignItems: "center",
    marginTop: 10,
    maxHeight: "16%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  informationTextHeading: {
    fontSize: 20,
    paddingRight:20
  },
  switchQuestion: {
    flexDirection: "row",
  },
  formQuestions: {
    marginTop: 15,
  },
  formQuestions2: {
    marginTop: 0,
  },
  formStyle: {
    borderBottomColor: "#ccc",
    height: 40,
    marginLeft: 15,
    color:"black"
    
  },
  topButtons: {
    fontSize: 25,
  },
  topButtonshidden: {
    fontSize: 25,
    color: "white"
  },
  buttonArea: {
    maxHeight: "38%",
    flexDirection: "row",
    flex: 1,
    marginBottom: 30,
    marginTop:15,
    justifyContent: "space-between",
    alignItems:"center",
    width: "90%",
  },
});
