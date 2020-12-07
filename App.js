import * as React from "react";
//ca-app-pub-8989962601724744~1688453206
//ca-app-pub-8989962601724744/3843843250
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SaverScreen from "./App/Screens/SaverScreen";
import LoginScreen from "./App/Screens/LoginScreen";
import WelcomeScreen from "./App/Screens/WelcomeScreen";
import CardScreen from "./App/Screens/CardScreen";
import SignUpScreen from "./App/Screens/SignUpScreen";
import InformationScreen from "./App/Screens/InformationScreen";

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();
  
export function DrawerScreens() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Saver" component={SaverScreen} />
        <Drawer.Screen name="Card" component={CardScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Information" component={InformationScreen} />
        {/* LogOut
        Info */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//Tab navigation System

// function MainScreens() {
//   return (
//     <NavigationContainer independent={true}>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Tab.Screen name="Login" component={LoginScreen}/>
//         <Tab.Screen name="Saver" component={SaverScreen} />
//         <Tab.Screen name="Card" component={CardScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator         screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Main" component={DrawerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );}
  
export default App;
