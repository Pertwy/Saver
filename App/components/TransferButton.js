import React from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";


export default function TransferButton(props){
    
  const updateTransfer = () => {
    props.setTransferMethod(props.number)
  };
  

  return(
    <TouchableOpacity 
      style={[styles.transferButton, 
            {backgroundColor:props.currentTransfer == props.number ? "black" : "white",},]}
            onPress={() => updateTransfer()}>

        <Text 
          style={[styles.transferButtonText,
                {color: props.currentTransfer == props.number ? "white" : "black"},]}>
          
          {props.title}

        </Text>
    </TouchableOpacity>)}

const styles = StyleSheet.create({
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
})