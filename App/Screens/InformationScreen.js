import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {FontAwesome, Feather, AntDesign} from "@expo/vector-icons";
import InformationText from "../components/InformationText"
import { color } from "react-native-reanimated";

export default function InformationScreen({ navigation }) {
  
  function handleDrawer(){
    navigation.openDrawer();
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container2}>
        <ScrollView>
              
              <SafeAreaView style={styles.buttonArea}>
                <TouchableOpacity onPress={handleDrawer}>
                  <Feather style={styles.topButtons} name="menu" size={28} color="black" />
                </TouchableOpacity>

                <Text style={styles.topButtons}>INFORMATION</Text>

                <Text style={[styles.topButtonshidden]}>.</Text>

              </SafeAreaView>

              <View style={styles.informationContainer}>  
                <InformationText/>
              </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex:1,
    alignItems:"center",
    width:"100%",
  },
  container2: {

    //alignItems:"center"
  },
  buttonArea: {
    maxHeight: "10%",
    flexDirection: "row",
    flex: 1,
    marginBottom: 15,
    marginTop:15,
    justifyContent: "space-between",
    width: "80%",
    marginLeft:"10%",
    marginRight:"5%",
  },
  topButtons: {
    fontSize: 25,
  },
  topButtonshidden: {
    fontSize: 25,
    color: "white"
  },
});
