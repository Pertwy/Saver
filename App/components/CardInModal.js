import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import {removeCardIn, removeCardOut} from "../Redux/actions"
import {store} from "../Redux/store"


export default function CardInModal({ SortCode, AccountNum, AccountName, id, inOut,}) {
    
  const [editCardSwitch, setEditCardSwitch] = useState(false)
  const [varSortCode, setVarSortCode] = useState(SortCode)
  const [varAccountNum, setVarAccountNum] = useState(AccountNum)
  const [varAccountName, setVarAccountName] = useState(AccountName)
  const [addCardSwitch, setAddCardSwitch] = useState(false)

  const [cardListIn, setCardListIn] = useState([])
  //const [newCardListOut, setNewCardListOut] = useState([])

  
  const unsubscribe = store.subscribe(() => {
    setCardListIn(store.getState().redux.cardsIn)
    //setNewCardListOut(store.getState().redux.cardsOut)
  })

  useEffect(()=>{
    unsubscribe
  },[])


  function handleEditOn(){
    setEditCardSwitch(true)
  }

  function handleEditOff(){
    setEditCardSwitch(false)
  }

//   function deleteCard(){
//     if (inOut == "cardsIn"){
//       store.dispatch(removeCardIn(id));
//       console.log(store.getState());
//       handleEditOff();}
//     else if (inOut == "cardsOut"){
//       store.dispatch(removeCardOut(id));
//       console.log(store.getState());
//       handleEditOff();}
//   }

let addSubtractIn;
if (addCardSwitchIn == true) {
  addSubtractIn = <AntDesign name="minuscircleo" size={32} color="black" />;
}
if (addCardSwitchIn == false) {
  addSubtractIn = <AntDesign name="pluscircleo" size={32} color="black" />;
}



  return (
    <SafeAreaView>
      
      {/* <View style={styles.headingTopElement}>
          <Text style={styles.informationTextHeading}>CARDS IN</Text>
        </View> */}
      
      {cardListIn.map((card)=>{
            const {name, account, sort, id} = card
            return (
                <TouchableOpacity key = {id}
                    onLongPress={() => handleEditOn()}
                    >
                    <View style={styles.cardContainer}>
                        <AntDesign name="creditcard" size={36} color="black" />
                        <View style={styles.cardContainerText}>
                        <Text>{account}</Text>
                        <Text>Sort code: {sort}</Text>
                        <Text>Account Number: {name}</Text>
                        </View>
                    </View>



                </TouchableOpacity>
            )
        })}


      <SafeAreaView style={styles.container}>
        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>INCOMING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
        </View>


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


 


      {editCardSwitch && (
          <View style={styles.editContainer}>
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Edit card a name</Text>
            </View>

            <TextInput
              onChangeText={(text) => setVarAccountName(text)}
              placeholder="Current account"
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Edit Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setVarAccountNum(text)}
              placeholder="XXXXXXXX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Edit Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setVarSortCode(text)}
              placeholder="XX-XX-XX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Done editing" onPress={() => handleEditOff()}></Button>
            {/* <Button title="Delete Card" color="red" onPress={() =>deleteCard()}></Button> */}
          </View>
        )}

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  cardContainer: {
    borderTopWidth: 3,
    flexDirection: "row",
    alignItems:"center",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop:10
  },
  cardContainerText: {
    paddingLeft: "5%",
  },
  informationTextTOP: {
    marginTop: 12,
    fontSize: 15,
  },
  headingElement: {
    marginBottom: 15,
    marginTop: 30,
  },
  informationTextHeading: {
    fontSize: 20,
  },
  informationTextTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
  },
  informationText: {
    fontSize: 15,
    paddingTop: 5,
  },
  informationContainer: {
    paddingTop: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  editContainer:{
    marginTop:15,
    //paddingBottom:15,
    //marginBottom: 20,
  },
  formStyle:{
    padding:5,
    paddingLeft:15,
  },
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
  },
});
