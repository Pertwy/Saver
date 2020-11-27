import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Cards({ SortCode, AccountNum, AccountName }) {
    
  return (
    <SafeAreaView>
      <TouchableOpacity>
      <View style={styles.cardContainer}>
        <AntDesign name="creditcard" size={36} color="black" />
        <View style={styles.cardContainerText}>
          <Text>{AccountName}</Text>
          <Text>Sort code: {SortCode}</Text>
          <Text>Account Number: {AccountNum}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderTopWidth: 3,
    flexDirection: "row",
    alignItems:"center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardContainerText: {
    paddingLeft: "5%",
  },
  informationTextTOP: {
    marginTop: 12,
    fontSize: 15,
  },
  headingElement: {
    marginBottom: 15,
    marginTop: 30,
  },
  informationTextHeading: {
    fontSize: 20,
  },
  informationTextTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
  },
  informationText: {
    fontSize: 15,
    paddingTop: 5,
  },
  informationContainer: {
    paddingTop: 15,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
