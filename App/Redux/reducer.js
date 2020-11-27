import { Immer } from "immer"
import * as actions from "./actionNames"
import {produce} from "immer"

let start = {
    user:"",
    savers:[],
    cardsIn:[],
    cardsOut:[],
}


export function reducer(state = start, action){
    if (action.type === actions.NEW_SAVER)
        return produce(state, draftState => {
            draftState.savers.push(action.payload)
        })

    else if (action.type === actions.FIREBASE_PULL)    
        return produce(state, draftState => {
            draftState = action.payload.fbData
        })

    else if (action.type === actions.REMOVE_SAVER)
        return produce(state, draftState => {
            const index = draftState.savers.findIndex(saver => saver.id === action.payload.id)
            delete draftState.savers[index]
            draftState.savers = draftState.savers.filter(function( element ) {
                return element !== undefined;
             });
            //console.log(index)
        })

    else if (action.type === actions.REMOVE_CARD_IN)
        return produce(state, draftState => {
            const index = draftState.cardsIn.findIndex(card => card.id === action.payload.id)
            delete draftState.cardsIn[index]
            draftState.savers = draftState.cardsIn.filter(function( element ) {
                return element !== undefined;
            });
        })

    else if (action.type === actions.REMOVE_CARD_OUT)
        return produce(state, draftState => {
            const index = draftState.cardsOut.findIndex(card => card.id === action.payload.id)
            delete draftState.cardsOut[index]
            draftState.savers = draftState.cardsOut.filter(function( element ) {
                return element !== undefined;
            });
        })

    else if (action.type === actions.NEW_CARD_IN)
        return produce(state, draftState => {
            draftState.cardsIn.push(action.payload)
        })

    else if (action.type === actions.NEW_CARD_OUT)
        return produce(state, draftState => {
            draftState.cardsOut.push(action.payload)
        })

    else if (action.type === actions.LOG_CLICK)
        return produce(state, draftState => {
            const index = draftState.savers.findIndex(saver => saver.id === action.payload.id)
            draftState.savers[index].dateTime.push(action.payload.dateTime)
            draftState.savers[index].runningTot += parseFloat(draftState.savers[index].price)
        
        })

    else if (action.type === actions.CURRENT_USER)
        return produce(state, draftState => {
            draftState.user = action.payload.currentUser
        })

    else if (action.type === actions.EDIT_SAVER)
        return produce(state, draftState => {
            const index = draftState.savers.findIndex(saver => saver.id === action.payload.id)
            draftState.savers[index].title = action.payload.title
            draftState.savers[index].price = action.payload.price
            draftState.savers[index].goalSwitch = action.payload.goalSwitch
            draftState.savers[index].title = action.payload.title
            draftState.savers[index].goal = action.payload.goal
            draftState.savers[index].colour = action.payload.colour
            draftState.savers[index].transOpt = action.payload.transOpt
            draftState.savers[index].runningTot = parseFloat(action.payload.runningTot)
        })    
}
