import * as actions from "./actionNames"

function reducer(state = [], action){
    if (action.type === actions.NEW_SAVER)
        return [
            ...state, action.payload]

    else if (action.type === actions.LOG_CLICK)
        return state.map((item, index) => {
            if(item.id === action.payload.id) {
                return {
                    ...item,
                        dateTime: action.payload.dateTime ,
                        runningTot: item.runningTot + item.price
                }
            }  
            return item
        })
        //return [
          //  ...state, action.payload.dateTime];
}


export default reducer