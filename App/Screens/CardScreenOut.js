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

export default function CardScreenOut(props) {
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
    addSubtract = <AntDesign style={styles.topButtons} name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitch == false) {
    addSubtract = <AntDesign style={styles.topButtons} name="pluscircleo" size={32} color="black" />;
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

  function handleClose(){
    props.setCardOutModal(false)
  }


  return (
    <View>
        <SafeAreaView style={styles.container}>

        <View style={styles.buttonArea}>

          <TouchableOpacity onPress={() => handleClose()}>
            <AntDesign name="checkcircleo" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.topButtons}>OUTGOING</Text>

          <TouchableOpacity onPress={() => viewAddCard()}>
            {addSubtract}
          </TouchableOpacity>
        </View>
         

        <FlatList
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
              placeholderTextColor = "#D3D3D3"
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
              placeholderTextColor = "#D3D3D3"
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setSortCode(text)}
              placeholder="XX-XX-XX"
              placeholderTextColor = "#D3D3D3"
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
    marginLeft: "10%",
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
    marginTop: 15,
  },
  formQuestions2: {
    marginTop: 0,
  },
  formStyle: {
    borderBottomColor: "#ccc",
    height: 40,
    paddingLeft: "5%",
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
