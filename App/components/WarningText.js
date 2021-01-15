import React from 'react'
import {
    StyleSheet,
    View,
    Text,
  } from "react-native";

function WarningText() {
    return (
        <View style={styles.container}>
            <Text style={styles.warningText}>
                Do not enter any real account details.{"\n"}{"\n"}This page represents a demo account page that will be functional in the future
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      //marginBottom: 15,
      marginTop:15,
    
    },
    warningText:{
        color:"red"
    }
})

export default WarningText
