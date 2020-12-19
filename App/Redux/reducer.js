import * as actions from "./actionNames"
import {produce} from "immer"

let start = {redux:{
    user:"",
    savers:[],
    cardsIn:[],
    cardsOut:[],
    cardsInView:[],
    selectedCardIn:"",
    selectedCardOut:"",
    cardId:1,
    saverId:1,
    update:1
}}


export function reducer(state = start, action){
    
    if (action.type === actions.NEW_SAVER)
        return produce(state, draftState => {
            draftState.redux.savers.push(action.payload)
        })

    else if (action.type === actions.FIREBASE_PULL)    
        return produce(state, draftState => {
            draftState.redux = (action.payload.fbData)
        })

    else if (action.type === actions.SELECTED_CARD_IN)    
        return produce(state, draftState => {
            draftState.redux.selectedCardIn = (action.payload.AccountName)
        })
    
    else if (action.type === actions.SELECTED_CARD_OUT)    
        return produce(state, draftState => {
            draftState.redux.selectedCardOut = (action.payload.AccountName)
        })

    else if (action.type === actions.SIGNOUT)    
        return produce(state, draftState => {
            draftState.redux = {redux:{
                user:"",
                savers:[],
                cardsIn:[],
                cardsOut:[],
                cardsInView:[],
                selectedCardIn:"",
                selectedCardOut:"",
                cardId:1,
                saverId:1,
                update:1
            }}
        })

    else if (action.type === actions.REMOVE_SAVER)
        return produce(state, draftState => {
            const index = draftState.redux.savers.findIndex(saver => saver.id === action.payload.id)
            delete draftState.redux.savers[index]
            draftState.redux.savers = draftState.redux.savers.filter(function( element ) {
                return element !== undefined;
             });
        })

    else if (action.type === actions.REMOVE_CARD_IN)
        return produce(state, draftState => {
            const index = draftState.redux.cardsIn.findIndex(card => card.id === action.payload.id)
            delete draftState.redux.cardsIn[index]
            draftState.redux.cardsIn = draftState.redux.cardsIn.filter(function( element ) {
                return element !== undefined;
            });
        })

    else if (action.type === actions.REMOVE_CARD_OUT)
        return produce(state, draftState => {
            const index = draftState.redux.cardsOut.findIndex(card => card.id === action.payload.id)
            delete draftState.redux.cardsOut[index]
            draftState.redux.cardsOut = draftState.redux.cardsOut.filter(function( element ) {
                return element !== undefined;
            });
        })

    else if (action.type === actions.PLUS_SAVER_ID)
        return produce(state, draftState => {
            draftState.redux.saverId += 1
        })


    else if (action.type === actions.PLUS_CARD_ID)
        return produce(state, draftState => {
            draftState.redux.cardId += 1
        })

    else if (action.type === actions.PAGE_UPDATE)
        return produce(state, draftState => {
            draftState.redux.update += 1
        })

    else if (action.type === actions.NEW_CARD_IN)
        return produce(state, draftState => {
            draftState.redux.cardsIn.push(action.payload)
        })

    else if (action.type === actions.NEW_CARD_OUT)
        return produce(state, draftState => {
            draftState.redux.cardsOut.push(action.payload)
        })

    else if (action.type === actions.LOG_CLICK)
        return produce(state, draftState => {
            const index = draftState.redux.savers.findIndex(saver => saver.id === action.payload.id)
            draftState.redux.savers[index].dateTime.push(action.payload.dateTime)
            draftState.redux.savers[index].runningTot += parseFloat(draftState.redux.savers[index].price)
        
        })

    else if (action.type === actions.CURRENT_USER)
        return produce(state, draftState => {
            draftState.redux.user = action.payload.userName
        })

    else if (action.type === actions.EDIT_SAVER)
        return produce(state, draftState => {
            const index = draftState.redux.savers.findIndex(saver => saver.id === action.payload.id)
            draftState.redux.savers[index].title = action.payload.title
            draftState.redux.savers[index].price = action.payload.price
            draftState.redux.savers[index].goalSwitch = action.payload.goalSwitch
            draftState.redux.savers[index].title = action.payload.title
            draftState.redux.savers[index].goal = action.payload.goal
            draftState.redux.savers[index].colour = action.payload.colour
            draftState.redux.savers[index].transOpt = action.payload.transOpt
            draftState.redux.savers[index].runningTot = parseFloat(action.payload.runningTot)
        })    
}
