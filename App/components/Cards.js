import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

import {removeCardIn, removeCardOut, selectedCardIn} from "../Redux/actions"
import {store} from "../Redux/store"


export default function Cards({ SortCode, AccountNum, AccountName, id, inOut, select}) {
    
  const [editCardSwitch, setEditCardSwitch] = useState(false)
  const [varSortCode, setVarSortCode] = useState(SortCode)
  const [varAccountNum, setVarAccountNum] = useState(AccountNum)
  const [varAccountName, setVarAccountName] = useState(AccountName)
  const [varSelected, setVarSelected] = useState(false)

  function handleEditOn(){
    setEditCardSwitch(true)
  }

  function handleEditOff(){
    setEditCardSwitch(false)
  }

  function deleteCard(){
    if (inOut == "cardsIn"){
      store.dispatch(removeCardIn(id));
      console.log(store.getState());
      handleEditOff();}
    else if (inOut == "cardsOut"){
      store.dispatch(removeCardOut(id));
      console.log(store.getState());
      handleEditOff();}
  }

  function selectCard(){
    setVarSelected(!varSelected)
    store.dispatch(selectedCardIn(id))
  }

  let selectButton;
  if (select == true) {
      selectButton = <MaterialIcons name="check-box-outline-blank" size={36} color="black" />

      if(varSelected == true){
        selectButton = <Ionicons name="md-checkbox-outline" size={36} color="black" />
      }
    
    }



  return (
    <SafeAreaView>
      <TouchableOpacity
      onLongPress={() => handleEditOn()}
      >
      <View style={styles.cardContainer}>
        <AntDesign name="creditcard" size={36} color="black" />
        <View style={styles.cardContainerText}>
          <Text>{varAccountName}</Text>
          <Text>Sort code: {varSortCode}</Text>
          <Text>Account Number: {varAccountNum}</Text>
        </View>
        <TouchableOpacity onPress={()=>selectCard()}>
          {selectButton}
        </TouchableOpacity>
        

      </View>

      </TouchableOpacity>

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
            <Button title="Delete Card" color="red" onPress={() =>deleteCard()}></Button>
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
});
