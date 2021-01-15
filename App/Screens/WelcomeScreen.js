import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView styles={styles.container} style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.titleText}>SAVER</Text>
      </View>

      <View style={styles.body}>
        <Text>
          Send money to your savings account or a charity with one click {"\n"}
        </Text>
        <Text>
          Please help test the app at this early stage, and provide feedback on the "Feedback" page
        </Text>
      </View>

      <View style={styles.footer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: 'Savers' })}> */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.button}>
            <Text>LOGIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View style={styles.button}>
            <Text>CREATE NEW ACCOUNT</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 0.6,
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: "12%",
  },
  body: {
    flex: 0.4,
    width: "60%",
    marginBottom: 20,
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
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
  },
});
