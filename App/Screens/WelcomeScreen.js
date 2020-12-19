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
          Send money to your savings or a charity with one click
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: 'Savers' })}>
          <View style={styles.button}>
            <Text>LOGIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View style={styles.button}>
            <Text>CREATE NEW ACCOUNT</Text>
          </View>
        </TouchableOpacity>

        {/*
        <TouchableOpacity
          Style={styles.butContainer}
          onPress={() => navigation.navigate("Saver")}
        >
          <View style={styles.button}>
            <Text>SAVER PAGE</Text>
          </View>
        </TouchableOpacity>*/}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
