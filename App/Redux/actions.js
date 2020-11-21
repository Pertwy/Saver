import * as actions from "./actionNames";

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

export function newSaver(id, title, price, goalSwitch, goal, colour, transOpt){
    return{
        type: actions.NEW_SAVER,
        payload:{
            id,
            title,
            price: parseFloat(price),
            goalSwitch,
            goal,
            colour,
            transOpt,
            runningTot : 0,
            dateTime: []
        }
    }
}