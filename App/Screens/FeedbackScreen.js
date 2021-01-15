import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,

} from "react-native";
import * as firebase from 'firebase';
import {Feather} from "@expo/vector-icons";

export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState("")

  //Navigate to Saver Page////..
  function navWelcome(){
    navigation.goBack()}

  function handleDrawer(){
    navigation.openDrawer();}

  //Upload data to Firebase /////////////
  function backup(){
    firebase
      .database()
      .ref()
      .child("Feedback")
      .push()
      .set(feedback);
  }

  function submitFeedback(){
    backup()
    setFeedback("")
    navWelcome()
  }

  return (
    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.buttonArea}>
        <TouchableOpacity onPress={handleDrawer}>
          <Feather style={styles.topButtons} name="menu" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.topButtons}>FEEDBACK</Text>

        <Text style={[styles.topButtonshidden]}>X</Text>
      </SafeAreaView>


      <View style={styles.feedbackContainer}>
        <View style={styles.switchQuestion}>
          <Text style={styles.formQuestions2}>Feedback</Text>
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setFeedback(text)}
          placeholder="Anything and everything"
          placeholderTextColor = "#D3D3D3"
          style={styles.formStyle}
          returnKeyType={"done"}
        />
      </View>

      <View style={styles.loginButtons}>
        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => submitFeedback()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT FEEDBACK</Text>
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
    flex: 1,
    marginBottom: 15,
    marginTop:15,
    justifyContent: "space-between",
    width: "80%",
    marginLeft:"5%",
    marginRight:"5%"
  },
  topButtons: {
    fontSize: 25,
  },
  topButtonshidden: {
    fontSize: 25,
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
    marginTop: 30,
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
  feedbackContainer:{
    width:"90%"
  },
})
