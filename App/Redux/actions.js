import * as actions from "./actionNames";

export function removeCardIn(id){
    return{
        type: actions.REMOVE_CARD,
        payload:{
            id,
        }
    }
}

export function removeCardOut(id){
    return{
        type: actions.REMOVE_CARD,
        payload:{
            id,
        }
    }
}

export function removeSaver(id){
    return{
        type: actions.REMOVE_SAVER,
        payload:{
            id,
        }
    }
}

export function logClick(dateTime, id, total){
    return{
        type: actions.LOG_CLICK,
        payload:{
            id,
            dateTime,
            total,
        }
    }   
}

export function newCardIn(acount, sort, name, id){
    return{
        type: actions.NEW_CARD_IN,
        payload:{
            name,
            acount,
            sort,
            id}}}

export function newCardOut(acount, sort, name, id){
    return{
        type: actions.NEW_CARD_OUT,
        payload:{
            name,
            acount,
            sort,
            id,}}}


export function newSaver(id, title, price, goalSwitch, goal, colour, transOpt){
    return{
        type: actions.NEW_SAVER,
        payload:{
            id,
            title,
            price,
            goalSwitch,
            goal,
            colour,
            transOpt,
            runningTot : 0,
            dateTime: []
        }
    }
}

export function editSaver(id, title, price, goalSwitch, goal, colour, transOpt, runningTot){
    return{
        type: actions.EDIT_SAVER,
        payload:{
            id,
            title,
            price,
            goalSwitch,
            goal,
            colour,
            transOpt,
            runningTot,
        }
    }
}

export function currentUser(currentUser){
    return{
        type: actions.CURRENT_USER,
        payload:{
            currentUser,
        }
    }   
}