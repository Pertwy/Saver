import React from "react";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import {colourButtonData} from "../data/colourButtonData"
    
export default function ColourButtons(props){    
    return(
        <React.Fragment>
            <View style={styles.circleContainer}>
            {colourButtonData.map((colour)=>{
                    const {id, name, rgb} = colour
                    return (
                        <TouchableOpacity
                        key = {id}
                        style={[styles.Circle, {backgroundColor:rgb}]}
                        onPress={() => props.setSaverColour(rgb)}
                        />
                    )
                })}
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
Circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10
  },
circleContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom:0
},
})
