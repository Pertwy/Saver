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
import {currentUser} from "../Redux/actions"
import {store} from "../Redux/store"

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [formError, setFormError] = useState("")

  function backup(){
    firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
  }

  function navSaver(){
    navigation.navigate("Main", { screen: 'Savers' })}


  function handleSignUp(email, password) {
    if (password.length < 6) {
      alert("Please enter more than 6 characters for a password");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
      store.dispatch(currentUser(cred.user.uid))
      setEmail("")
      setPassword("")
      backup()
      // {() => setEmail("")}
      // {() => setPassword("")}
      navSaver()
      }).catch(err => {
        setFormError(err.message)
      })
  } 
    
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingTopElement}>
        <Text style={styles.informationTextHeading}>CREATE NEW ACCOUNT</Text>
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
          onPress={() => handleSignUp(email, password)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => navSaver()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SKIP</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{formError}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingTopElement: {
    alignItems: "center",
    marginTop: 10,
  },
  informationTextHeading: {
    fontSize: 25,
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
