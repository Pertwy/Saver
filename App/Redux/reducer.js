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
}
