import React, { useState } from "react";
import { Text } from "native-base";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase';
import {currentUser, firebasePull} from "../Redux/actions"
import {store} from "../Redux/store"

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  //Sign in Function /////////////
  
  function backup(){
    firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
  }


    const johnUser = "johnperkins"
//Download function ////////////////////
function setupDataListener() {
  firebase
    .database()
    .ref(store.getState().redux.user)
    .on('value', (snapshot) => {
      //console.log(snapshot.val())
      store.dispatch(firebasePull(snapshot.val()));
      console.log(store.getState())

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      })};

  function navSaver(){
    navigation.navigate('Saver')}
  


  /*
    function handleSignUp(email, password) {
    try {
      if (password.length < 6) {
        alert("Please enter more than 6 characters for a password");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  }
  */

  //Login Function ////////////

  function handleLogin(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password).then(cred =>{
          store.dispatch(currentUser(cred.user.uid))
          setupDataListener()
          navSaver()
          console.log(cred.user.uid);
        });
    } catch {
      console.log(error.toString());
    }}



    //SignUP
    function handleSignUp(email, password) {
      if (password.length < 6) {
        alert("Please enter more than 6 characters for a password");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
        store.dispatch(currentUser(cred.user.uid))
        console.log(store.getState().redux.user)
        setEmail("")
        setPassword("")
        navSaver()
        })
    } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingTopElement}>
        <Text style={styles.informationTextHeading}>PROFILE</Text>
      </View>

      <View style={styles.loginForm}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          style={styles.formStyle}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          style={styles.formStyle}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.loginButtons}>
        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => handleLogin(email, password)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => handleSignUp(email, password)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </View>
        </TouchableOpacity>

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
          onPress={() => setupDataListener()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>DOWNLOAD DATA</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingTopElement: {
    alignItems: "center",
    //marginBottom: 40,
    marginTop: 10,
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
    marginTop: 50,
    flex: 1,
    width: "80%",
  },
  button: {
    padding: 14,
    margin: 5,
    borderColor: "black",
    borderWidth: 3,
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
})
