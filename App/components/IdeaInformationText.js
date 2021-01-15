import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function IdeaInformationText() {
  return (
    <View style={styles.informationContainer}>
      <View style={styles.headingElement}>
        <Text style={styles.informationTextHeading}>SAVER IDEAS</Text>
        <Text style={styles.informationText}>
          Stuck on what to save on? we've got some ideas for you
        </Text>
      </View>
      <Text style={styles.informationTextTitle}>Beer</Text>
      <Text style={styles.informationText}></Text>
      <Text style={styles.informationTextTitle}>Coffee</Text>
      <Text style={styles.informationText}></Text>
      <Text style={styles.informationTextTitle}>Bring your own lunch</Text>
      <Text style={styles.informationText}></Text>
      <Text style={styles.informationTextTitle}>Walk to work</Text>
      <Text style={styles.informationText}></Text>
      <Text style={styles.informationTextTitle}>Eat in</Text>
      <Text style={styles.informationText}></Text>
      <Text style={styles.informationTextTitle}>Teach children to save</Text>
      <Text style={styles.informationText}>When children ask for something, let them click a Saver instead. At the end of the year, let them know what they've earned</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingElement: {
    marginBottom: 15,
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
