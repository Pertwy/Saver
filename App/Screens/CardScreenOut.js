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
import {newCardOut, pageUpdate} from "../Redux/actions";
import {store} from "../Redux/store";

export default function CardScreenOut({ navigation }) {
  const [idCounter, setIdCounter] = useState(1);
  const [newCardListOut, setNewCardListOut] = useState([])
  const [addCardSwitch, setAddCardSwitch] = useState(false);
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");


  function handelChange(){
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



  return (
    <View>
        <SafeAreaView style={styles.container}>

        <View style={styles.buttonArea}>

          <Text style={[styles.topButtonshidden]}>X</Text>

          <Text style={styles.topButtons}>OUTGOING</Text>

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
              select = {true}
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
    marginTop: 40,
    marginBottom: 0,
    flexDirection:"row",
    alignItems:"center",
    //alignContent:"center",
    //justifyContent:"center"
  },
  headingTopElement: {
    alignItems: "center",
    //marginBottom: 40,
    marginTop: 10,
    maxHeight: "16%",
    flexDirection: "row",
    // justifyContent: "flex-end",
    justifyContent: "center",
    //flex: 1,
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
    paddingLeft: "5%",
    marginTop: 15,
  },
  formQuestions2: {
    paddingLeft: "5%",
    marginTop: 0,
  },
  formStyle: {
    //backgroundColor: "white",
    borderBottomColor: "#ccc",
    //borderBottomWidth: 1,
    height: 40,
    paddingLeft: "5%",
    marginLeft: 15,
    color:"black"
    
  },
  topButtons: {
    fontSize: 25,
    paddingLeft: 30,
    paddingRight:30
  },
  topButtonshidden: {
    fontSize: 25,
    paddingLeft: 30,
    paddingRight:30,
    color: "white"
  },
  buttonArea: {
    maxHeight: "38%",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginBottom: 15,
    marginTop:15,
    alignContent: "space-between",
  },
});
