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
  ScrollView,
} from "react-native";
import {FontAwesome, Feather, AntDesign} from "@expo/vector-icons";
import Cards from "../components/Cards";
import * as firebase from 'firebase';
import {newCardOut, newCardIn, newCardInView, plusCardId, pageUpdate} from "../Redux/actions";
import {store} from "../Redux/store";
import backup from "../functions/backup"

export default function CardScreen({ navigation }) {
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
    addSubtract = <AntDesign name="minuscircleo" size={25} color="black" />;
  }
  if (addCardSwitch == false) {
    addSubtract = <AntDesign name="pluscircleo" size={25} color="black" />;
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
    //backup()
    plusCardId()
    unsubscribe()
    // setIdCounter(idCounter + 1);
  }

  const [addCardSwitchIn, setAddCardSwitchIn] = useState(false);
  const [sortCodeIn, setSortCodeIn] = useState("");
  const [accountNumberIn, setAccountNumberIn] = useState("");
  const [accountNameIn, setAccountNameIn] = useState("");

  let addSubtractIn;
  if (addCardSwitchIn == true) {
    addSubtractIn = <AntDesign name="minuscircleo" size={25} color="black" />;
  }
  if (addCardSwitchIn == false) {
    addSubtractIn = <AntDesign name="pluscircleo" size={25} color="black" />;
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
    store.dispatch(newCardIn(accountNumberIn,sortCodeIn,accountNameIn, idCounter, "cardsIn"))
    setNewCardListIn(store.getState().redux.cardsIn)
    //backup()
    unsubscribe()
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

  return (

      <SafeAreaView style={styles.container}>
        
        
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={handleDrawer}>
            <Feather style={styles.topButtons} name="menu" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.topButtons}>ACCOUNTS</Text>

          <Text style={[styles.topButtonshidden]}>.</Text>
        </View>

        
        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>OUTGOING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCard()}>
            {addSubtract}
          </TouchableOpacity>
        </View>

        <FlatList
          //style={{flex: 1}}
          data={newCardListOut}
          keyExtractor={(newCardListOut) => newCardListOut.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
              id = {item.id}
              inOut = "cardsOut"
            />
          )}
        />

        {addCardSwitch && (
          <View>
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Give the card a name</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountName(text)}
              placeholder="Current account"
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNumber(text)}
              placeholder="XXXXXXXX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setSortCode(text)}
              placeholder="XX-XX-XX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Add" onPress={() => addCard()}></Button>
          </View>
        )}

        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeadingIncomingAccount}>INCOMING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
        </View>
         
        <FlatList
          data={newCardListIn}
          keyExtractor={(newCardListIn) => newCardListIn.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
              id = {item.id}
              inOut = "cardsIn"
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
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNumberIn(text)}
              placeholder="XXXXXXXX"
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
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Add" onPress={() => addCardIn()}></Button>
          </View>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  informationText: {
    paddingTop: 9,
  },
  addCardText: {
    paddingLeft: "5%",
    fontSize: 20,
  },
  container: {
    marginLeft: "5%",
    //marginRight: "5%",
    //backgroundColor:"white"
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
    marginTop: 50,
    marginBottom: 0,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
    width: "80%",
    marginLeft:"5%",
    //marginRight:"5%"

  },
  buttonArea: {
    maxHeight: "50%",
    flexDirection: "row",
    //flex: 1,
    marginBottom: 15,
    marginTop:15,
    justifyContent: "space-between",
    width: "80%",
    marginLeft:"5%",
    marginRight:"5%"
  },
  topButtons: {
    fontSize: 25,
  },
  topButtonshidden: {
    fontSize: 25,
    color: "white"
  },


  informationTextHeading: {
    fontSize: 20,
    paddingRight:20,
  },
  informationTextHeadingIncomingAccount:{
    fontSize: 20,
    paddingRight:23,
  },
  switchQuestion: {
    flexDirection: "row",
  },
  formQuestions: {
    paddingLeft: "5%",
    marginTop: 15,
  },
  formQuestions2: {
    paddingLeft: "5%",
    marginTop: 0,
  },
  formStyle: {
    borderBottomColor: "#ccc",
    height: 40,
    paddingLeft: "5%",
    marginLeft: 15,
  },
});
