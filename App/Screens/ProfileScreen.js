import React, { useState } from "react";
import { Text } from "native-base";
import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase';
import {currentUser, firebasePull, signOutRedux} from "../Redux/actions"
import {store} from "../Redux/store"

import {FontAwesome, Feather, AntDesign} from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {

  //Navigate to Saver Page////..
  function navWelcome(){
    navigation.navigate('Welcome')}

  function handleDrawer(){
    navigation.openDrawer();
  }

  function setupDataListener() {
    firebase
      .database()
      .ref(store.getState().redux.user)
      .on('value', (snapshot) => {
        store.dispatch(firebasePull(snapshot.val()));

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })};


  //Upload data to Firebase /////////////
  function backup(){
    firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
  }

    //Log out /////////
    function signUserOut(){
      setupDataListener();
      firebase.auth().signOut().then(function() {
        store.dispatch(signOutRedux())
        navWelcome()
      }).catch(function(error) {
        // An error happened.
      })}

  return (
    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.buttonArea}>
        <TouchableOpacity onPress={handleDrawer}>
          <Feather style={styles.topButtons} name="menu" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.topButtons}>PROFILE</Text>

        <Text style={[styles.topButtonshidden]}>X</Text>
      </SafeAreaView>



      <View style={styles.loginButtons}>
        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => backup()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>BACKUP DATA</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => signUserOut()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingTopElement: {
    alignItems: "center",
    marginTop: 10,
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
  informationTextHeading: {
    fontSize: 20,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  loginForm: {
    padding: 30,
    paddingTop: 40,
    paddingBottom: 50,
    width: "90%",
  },
  loginButtons: {
    marginTop: 0,
    flex: 1,
    width: "80%",
  },
  button: {
    padding: 14,
    margin: 5,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
  },
  formStyle: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    height: 50,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 40,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
})
