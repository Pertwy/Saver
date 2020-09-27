import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

export default function InformationText() {
  return (
    <View style={styles.informationContainer}>
      <View style={styles.headingElement}>
        <Text style={styles.informationTextHeading}>PURPOSE</Text>
      </View>
      <Text style={styles.informationText}>
        The purpose of this app was to nudge people to save money buy NOT doing something. NOT have that coffee in the morning, 
        by NOT haveing that final beer at the pub, or by NOT going out for dinner.
      </Text>
      <Text style={styles.informationTextTOP}>
        The app is purely to help people save money, so will not cost anything. I am also applying to be able to use "World banking" 
        which will allow users to transfer their money between account with no transaction fee
      </Text>


      <View style={styles.headingElement}>
        <Text style={styles.informationTextHeading}>INFO</Text>
      </View>
      <Text style={styles.informationText}>
        Tap on a Saver everytime you dont do something
      </Text>
      <Text style={styles.informationText}>
        Hold Down a "Saver" to edit it, or click the edit button
      </Text>
      <Text style={styles.informationText}>
        When editing, typing in the boxes will automatically update the "Saver"
      </Text>
      <Text style={styles.informationText}>
        After editing, the amount saved will not change
      </Text>
      <Text style={styles.informationText}>
        The Transfer button does not do anything currently
      </Text>
      <Text style={styles.informationText}>
        The Authorisation does not work yet
      </Text>

      <View style={styles.headingElement}>
        <Text style={styles.informationTextHeading}>FURTHER ADDITIONS</Text>
      </View>
      <Text style={styles.informationTextTitle}>Total saved</Text>
      <Text style={styles.informationText}>
        Everytime you transfer money, your grand total saved goes up
      </Text>
      <Text style={styles.informationTextTitle}>Disable Transactions</Text>
      <Text style={styles.informationText}>
        A switch to completely turn off transactions so that you can use the app
        as a counter
      </Text>
      <Text style={styles.informationTextTitle}>Savers "fill up"</Text>
      <Text style={styles.informationText}>
        If you have set a goal, as you clcik the Saver, the coloured part of the
        saver will gradually fill up in proportion to the amount you have saved
        against your goal
      </Text>
      <Text style={styles.informationTextTitle}>Graphs</Text>
      <Text style={styles.informationText}>
        Graphs to show you what/when/how much you have saved
      </Text>
      <Text style={styles.informationTextTitle}>Charities</Text>
      <Text style={styles.informationText}>
        Ability to transfer funds to charities as well as your own account
      </Text>
      <Text style={styles.informationTextTitle}>One off saver</Text>
      <Text style={styles.informationText}>
        you might not always want to save the same amount of money on each item.
        There will be a Saver where
      </Text>
      <Text style={styles.informationTextTitle}>
        Record time and dates of clicks
      </Text>
      <Text style={styles.informationText}>
        Record time and dates of clicks
      </Text>
      <Text style={styles.informationTextTitle}>Notifications - Pre-empt</Text>
      <Text style={styles.informationText}>
        After recording times and dates, send notifications at a similar to so
        that people do the same thing again. i.e. if someone clicks the button
        instead of buying a coffee at 8:30, send them a message at 8:15 telling
        them to save
      </Text>
      <Text style={styles.informationTextTitle}>Notifications - Charity</Text>
      <Text style={styles.informationText}>
        Notify people of the charities we have partnered with and how you not
        buying a coffee would impact that charity
      </Text>
      <Text style={styles.informationTextTitle}>Notifications - Goals</Text>
      <Text style={styles.informationText}>
        how close are you to your goal? how many cups of coffee will it take for
        you to save for that holiday? How long will it take?
      </Text>
      <Text style={styles.informationTextTitle}>More Colours</Text>
      <Text style={styles.informationText}>
        Allow for more colours of Savers
      </Text>
      <Text style={styles.informationTextTitle}>More idea prompts</Text>
      <Text style={styles.informationText}>
        Style the ideas page and add more elements to it
      </Text>
      <Text style={styles.informationTextTitle}>Improve personal finance</Text>
      <Text style={styles.informationText}>
        Links to articles where you can imporve your personal finance
      </Text>
      <Text style={styles.informationTextTitle}>IOS 14</Text>
      <Text style={styles.informationText}>
        Add an IOS 14 button for your homescreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  informationTextTOP:{
    marginTop: 12,
    fontSize:15
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
