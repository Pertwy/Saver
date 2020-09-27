import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SaverScreen from "./App/Screens/SaverScreen";
import LoginScreen from "./App/Screens/LoginScreen";
import WelcomeScreen from "./App/Screens/WelcomeScreen";
import CardScreen from "./App/Screens/CardScreen";

const Tab = createBottomTabNavigator();

function MainScreens() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        
        <Tab.Screen name="Login" component={LoginScreen}/>
        <Tab.Screen name="Saver" component={SaverScreen} />
        <Tab.Screen name="Card" component={CardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator         screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );}

/*
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Saver" component={SaverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

export default App;
