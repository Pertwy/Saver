import React, { useState } from "react";
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
import {newCardOut, newCardIn} from "../Redux/actions";
import {store} from "../Redux/store";

export default function CardScreen({ navigation }) {
  const [addCardSwitch, setAddCardSwitch] = useState(false);
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [newCardListIn, setNewCardListIn] = useState()
  const [newCardListOut, setNewCardListOut] = useState()


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
    setNewCardListOut(store.getState().cardsOut)
    //storeCardsOut(sortCode, accountName, idCounter, accountNumber)
    setIdCounter(idCounter + 1);
  }

  const [addCardSwitchIn, setAddCardSwitchIn] = useState(false);
  const [sortCodeIn, setSortCodeIn] = useState("");
  const [accountNumberIn, setAccountNumberIn] = useState("");
  const [idCounterIn, setIdCounterIn] = useState(1);
  const [accountNameIn, setAccountNameIn] = useState("");

  let addSubtractIn;
  if (addCardSwitchIn == true) {
    addSubtractIn = <AntDesign name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitchIn == false) {
    addSubtractIn = <AntDesign name="pluscircleo" size={32} color="black" />;
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
    store.dispatch(newCardIn(accountNumberIn,sortCodeIn,accountNameIn, idCounterIn))
    setNewCardListIn(store.getState().cardsIn)
    console.log(store.getState())
    //storeCardsIn(sortCodeIn, accountNameIn, idCounterIn, accountNumberIn)
    setIdCounterIn(idCounterIn + 1);
  }

  function storeCardsIn(sortCodeIn, accountNameIn, idCounterIn, accountNumberIn) {
    firebase
      .database()
      .ref()
      .child((store.getState().user).substring(0, (store.getState().user).indexOf("@")))
      .child("cardsIn")
      .child(idCounterIn)
      .set({
          id : idCounterIn,
          cardName : accountNameIn,
          accountNumber : accountNumberIn,
          sortCode: sortCodeIn
      });
  }

  function storeCardsOut(sortCode, accountName, idCounter, accountNumber) {
    firebase
      .database()
      .ref()
      .child((store.getState().user).substring(0, (store.getState().user).indexOf("@")))
      .child("cardsOut")
      .child(idCounter)
      .set({
          id : idCounter,
          cardName : accountName,
          accountNumber : accountNumber,
          sortCode: sortCode
      });
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingTopElement}>
          <Text style={styles.informationTextHeading}>ACCOUNTS</Text>
        </View>

        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>OUTGOING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCard()}>
            {addSubtract}
          </TouchableOpacity>
        </View>

        <FlatList
          style={{flex: 1}}
          data={newCardListOut}
          keyExtractor={(newCardListOut) => newCardListOut.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
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
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>INCOMING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
        </View>

        <FlatList
          style={{flex: 1}}
          data={newCardListIn}
          keyExtractor={(newCardListIn) => newCardListIn.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
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
    marginLeft: "5%",
    marginRight: "5%",
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
    marginTop: 60,
    marginBottom: 20,
    flexDirection:"row",
    alignItems:"center",
    //alignContent:"center",
    //justifyContent:"center"
  },
  headingTopElement: {
    alignItems: "center",
    //marginBottom: 40,
    marginTop: 10,
  },
  informationTextHeading: {
    fontSize: 20,
    paddingRight:20
  },
  switchQuestion: {
    flexDirection: "row",
  },
  formQuestions: {
    paddingLeft: "5%",
    marginTop: 35,
  },
  formQuestions2: {
    paddingLeft: "5%",
    marginTop: 10,
  },
  formStyle: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: "5%",
  },
});
