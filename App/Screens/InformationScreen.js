import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import InformationText from "../components/InformationText"

export default function InformationScreen({ navigation }) {
  
  function handleDrawer(){
    navigation.openDrawer();
  }
  
  return (
    <View>
      <ScrollView>
            
            <SafeAreaView style={styles.buttonArea}>
              <TouchableOpacity onPress={handleDrawer}>
                <Text style={styles.topButtons}>MENU</Text>
              </TouchableOpacity>
              
              <Text style={styles.topButtons}>INFORMATION</Text>
            </SafeAreaView>

            <View style={styles.informationContainer}>  
              <InformationText/>
            </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonArea: {
    maxHeight: "10%",
    flexDirection: "row",
    // justifyContent: "flex-end",
    justifyContent: "center",
    flex: 1,
    marginBottom: 15,
  },
  topButtons: {
    fontSize: 20,
    padding: 10,
  },
  header: {
    flex: 0.6,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: "12%",
  },
  body: {
    flex: 0.4,
    width: "60%",
    marginBottom: 40,
    //alignItems: "center",
    marginLeft: "12%",
  },
  footer: {
    flex: 0.2,
    marginBottom: 40,
    marginLeft: "10%",
    width: "80%",
  },
  button: {
    padding: 15,
    paddingRight: 60,
    paddingLeft: 60,
    margin: 7,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
  },
});
