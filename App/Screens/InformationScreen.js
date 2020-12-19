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
      <SafeAreaView>
        <ScrollView>
              
              <SafeAreaView style={styles.buttonArea}>
                <TouchableOpacity onPress={handleDrawer}>
                  <Feather style={styles.topButtons} name="menu" size={28} color="black" />
                </TouchableOpacity>

                <Text style={styles.topButtons}>INFORMATION</Text>

                <Text style={[styles.topButtonshidden]}>X</Text>

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
    backgroundColor:"white"
  },
  buttonArea: {
    maxHeight: "10%",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginBottom: 15,
    marginTop:15,
    alignContent: "space-between",
  },
  topButtons: {
    fontSize: 25,
    paddingLeft: 40,
    paddingRight:40
  },
  topButtonshidden: {
    fontSize: 25,
    paddingLeft: 40,
    paddingRight:40,
    color: "white"

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
