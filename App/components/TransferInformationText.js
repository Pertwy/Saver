import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function TransferInformationText() {
  return (
    <View style={styles.informationContainer}>
      <View style={styles.headingElement}>
        <Text style={styles.informationTextHeading}>TRANSFER INFO</Text>
        <Text style={styles.informationText}>
          When would you like money to be transfered?
        </Text>
      </View>
      <Text style={styles.informationTextTitle}>On every click</Text>
      <Text style={styles.informationText}>
        Everytime you click a Saver, you will be prompted to transfer the saver
        amount
      </Text>
      <Text style={styles.informationTextTitle}>
        Transfer "on achieving your goal"
      </Text>
      <Text style={styles.informationText}>
        Only transfer money when you achieve your goal. You will also be able to
        click the "transfer" button on the right hand side of the Saver to
        transfer the total amount saved at any point
      </Text>
      <Text style={styles.informationTextTitle}>
        Transfer upon clicking the transfer button
      </Text>
      <Text style={styles.informationText}>
        Money will only be transfered when you click the "transfer" button on
        the right hand side of the Saver
      </Text>
      <Text style={styles.informationTextTitle}>
        No Transfer
      </Text>
      <Text style={styles.informationText}>
        Select "No transfer" if you never wish to use this "Saver" to transfer money.
        In effect, your Saver will become a counter.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingElement: {
    marginBottom: 15
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
    paddingTop:15,
    paddingLeft: "5%",
    paddingRight: "5%"
  },
});
