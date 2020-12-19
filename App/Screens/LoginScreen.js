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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("")


  //Navigate to Saver Page////..
  function navSaver(){
    navigation.navigate('Savers')}

  function handleDrawer(){
    navigation.openDrawer();
  }

  //Upload data to Firebase /////////////
  function backup(){
    firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
  }

  //const johnUser = "johnperkins"
  //Download function ////////////////////
  function setupDataListener() {
    firebase
      .database()
      .ref(store.getState().redux.user)
      .on('value', (snapshot) => {
        store.dispatch(firebasePull(snapshot.val()));

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })};

    //Login Function ////////////
    function handleLogin(email, password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password).then(cred =>{
            store.dispatch(currentUser(cred.user.uid))
            setupDataListener()
            navSaver()
          }).catch(err => {
            setFormError(err.message)})
      }


    //SignUP
    function handleSignUp(email, password) {
      if (password.length < 6) {
        alert("Please enter more than 6 characters for a password");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
        store.dispatch(currentUser(cred.user.uid))
        setEmail("")
        setPassword("")
        // {() => setEmail("")}
        // {() => setPassword("")}
        navSaver()
        }).catch(err => {
          setFormError(err.message)
        })
    } 

    //Log out /////////
    function signUserOut(){
      setupDataListener();
      firebase.auth().signOut().then(function() {
        store.dispatch(signOutRedux())
      }).catch(function(error) {
        // An error happened.
      })}

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
      <View style={styles.buttonArea}>

        {/* <TouchableOpacity onPress={handleDrawer}>
          <Text style={styles.topButtons}>MENU</Text>
        </TouchableOpacity> */}

        <Text style={styles.topButtons}>SIGN IN</Text>

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

      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{formError}</Text>
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

        {/* <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => handleSignUp(email, password)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => signUserOut()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </View>
        </TouchableOpacity> */}

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
  buttonArea: {
    maxHeight: "10%",
    flexDirection: "row",
    // justifyContent: "flex-end",
    justifyContent: "center",
    flex: 1,
    marginBottom: 15,
  },
  topButtons: {
    fontSize: 25,
    padding: 10,
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
    marginTop: 50,
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
