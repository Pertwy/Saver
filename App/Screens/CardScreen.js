import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Cards from "../components/Cards";

export default function CardScreen({ navigation }) {
  const [addCardSwitch, setAddCardSwitch] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [addNewCard, setAddNewCard] = useState({
    id: 0,
    sort: 0,
    account: 0,
    name: "",
  });

  let addSubtract;
  if (addCardSwitch == true) {
    addSubtract = <AntDesign name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitch == false) {
    addSubtract = <AntDesign name="pluscircleo" size={32} color="black" />;
  }

  function viewAddCard() {
    if (addCardSwitch == false) {
      setAddCardSwitch(true);
    }
    if (addCardSwitch == true) {
      setAddCardSwitch(false);
    }
  }

  function addCard() {
    setAddNewCard({
      ...(addNewCard.sort = parseFloat(sortCode)),
    });

    setAddNewCard({
      ...(addNewCard.account = parseFloat(accountNumber)),
    });

    setAddNewCard({
      ...(addNewCard.id = idCounter),
    });
    setAddNewCard({
      ...(addNewCard.name = accountName),
    });

    setAddCardSwitch(false);
    updateCardList();
    setIdCounter(idCounter + 1);
  }

  function updateCardList() {
    setCardList((cardList) => [...cardList, addNewCard]);
    //console.log(cardList);
  }

  const [addCardSwitchIn, setAddCardSwitchIn] = useState(false);
  const [cardListIn, setCardListIn] = useState([]);
  const [sortCodeIn, setSortCodeIn] = useState("");
  const [accountNumberIn, setAccountNumberIn] = useState("");
  const [idCounterIn, setIdCounterIn] = useState(1);
  const [accountNameIn, setAccountNameIn] = useState("");
  const [addNewCardIn, setAddNewCardIn] = useState({
    id: 0,
    sort: 0,
    account: 0,
    name: "",
  });

  let addSubtractIn;
  if (addCardSwitchIn == true) {
    addSubtractIn = <AntDesign name="minuscircleo" size={32} color="black" />;
  }
  if (addCardSwitchIn == false) {
    addSubtractIn = <AntDesign name="pluscircleo" size={32} color="black" />;
  }

  function viewAddCardIn() {
    if (addCardSwitchIn == false) {
      setAddCardSwitchIn(true);
    }
    if (addCardSwitchIn == true) {
      setAddCardSwitchIn(false);
    }
  }

  function addCardIn() {
    setAddNewCardIn({
      ...(addNewCardIn.sort = parseFloat(sortCodeIn)),
    });

    setAddNewCardIn({
      ...(addNewCardIn.account = parseFloat(accountNumberIn)),
    });

    setAddNewCardIn({
      ...(addNewCardIn.id = idCounterIn),
    });
    setAddNewCardIn({
      ...(addNewCardIn.name = accountNameIn),
    });

    setAddCardSwitchIn(false);
    updateCardListIn();
    setIdCounterIn(idCounterIn + 1);
  }

  function updateCardListIn() {
    setCardListIn((cardListIn) => [...cardListIn, addNewCardIn]);
    //console.log(cardList);
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingTopElement}>
          <Text style={styles.informationTextHeading}>ACCOUNTS</Text>
        </View>

        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>OUTGOING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCard()}>
            {addSubtract}
          </TouchableOpacity>
        </View>

        <FlatList
          data={cardList}
          keyExtractor={(cardList) => cardList.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
            />
          )}
        />

        {addCardSwitch && (
          <View>
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Give the card a name</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountName(text)}
              placeholder="Current account"
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNumber(text)}
              placeholder="XXXXXXXX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setSortCode(text)}
              placeholder="XX-XX-XX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Add" onPress={() => addCard()}></Button>
          </View>
        )}
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <View style={styles.headingElement}>
          <Text style={styles.informationTextHeading}>INCOMING ACCOUNTS</Text>
          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
        </View>

        <FlatList
          data={cardListIn}
          keyExtractor={(cardListIn) => cardListIn.id.toString()}
          renderItem={({ item }) => (
            <Cards
              SortCode={item.sort}
              AccountNum={item.account}
              AccountName={item.name}
            />
          )}
        />
        {/*}
        <View style={styles.addCard}>
          <TouchableOpacity onPress={() => viewAddCardIn()}>
            {addSubtractIn}
          </TouchableOpacity>
          <Text style={styles.addCardText}>ADD A CARD</Text>
          </View>*/}

        {addCardSwitchIn && (
          <View>
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions}>Give the card a name</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNameIn(text)}
              placeholder="Current account"
              style={styles.formStyle}
              //returnKeyType={"done"}
            />

            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Account Number</Text>
            </View>

            <TextInput
              onChangeText={(text) => setAccountNumberIn(text)}
              placeholder="XXXXXXXX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <View style={styles.switchQuestion}>
              <Text style={styles.formQuestions2}>Sort Code</Text>
            </View>

            <TextInput
              onChangeText={(text) => setSortCodeIn(text)}
              placeholder="XX-XX-XX"
              style={styles.formStyle}
              keyboardType="decimal-pad"
              returnKeyType={"done"}
            />
            <Button title="Add" onPress={() => addCardIn()}></Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  informationText: {
    paddingTop: 4,
  },
  addCardText: {
    paddingLeft: "5%",
    fontSize: 20,
  },
  container: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  addCard: {
    flexDirection: "row",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "black",
    paddingTop: 7,
    paddingBottom: 5,
    alignItems: "center",
  },
  headingElement: {
    marginTop: 60,
    marginBottom: 20,
    flexDirection:"row",
    alignItems:"center",
    //alignContent:"center",
    //justifyContent:"center"
  },
  headingTopElement: {
    alignItems: "center",
    //marginBottom: 40,
    marginTop: 10,
  },
  informationTextHeading: {
    fontSize: 20,
    paddingRight:20
  },
  switchQuestion: {
    flexDirection: "row",
  },
  formQuestions: {
    paddingLeft: "5%",
    marginTop: 35,
  },
  formQuestions2: {
    paddingLeft: "5%",
    marginTop: 10,
  },
  formStyle: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: "5%",
  },
});
