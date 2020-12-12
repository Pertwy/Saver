import * as actions from "./actionNames";

export function firebasePull(fbData){
    //console.log(fbData)
    return{
        type: actions.FIREBASE_PULL,
        payload:{
            fbData
        }
    }
}

export function pageUpdate(){
    return{
        type: actions.PAGE_UPDATE,
    }
}

export function signOutRedux(){
    return{
        type: actions.SIGNOUT
    }
}

export function plusCardId(){
    return{
        type: actions.PLUS_CARD_ID,
    }
}

export function selectedCardIn(id){
    return{
        type: actions.SELECTED_CARD_IN,
        payload:{
            id,
        }
    }
}

export function selectedCardOut(id){
    return{
        type: actions.SELECTED_CARD_OUT,
        payload:{
            id,
        }
    }
}


export function removeCardIn(id){
    return{
        type: actions.REMOVE_CARD_IN,
        payload:{
            id,
        }
    }
}

export function removeCardOut(id){
    return{
        type: actions.REMOVE_CARD_OUT,
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

export function newCardIn(account, sort, name, id){
    return{
        type: actions.NEW_CARD_IN,
        payload:{
            name,
            account,
            sort,
            id,}}}

export function newCardInView(account, sort, name, id){
    return{
        type: actions.NEW_CARD_IN_VIEW,
            payload:{
                name,
                account,
                sort,
                id,}}}

export function newCardOut(account, sort, name, id){
    return{
        type: actions.NEW_CARD_OUT,
        payload:{
            name,
            account,
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
            dateTime: ["init"]
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

export function currentUser(userName){
    return{
        type: actions.CURRENT_USER,
        payload:{
            userName,
        }
    }   
}