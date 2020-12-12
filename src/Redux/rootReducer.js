import { combineReducers } from "redux";


const defaultState = {
    currentUser: 2,
    opinions: []
}


const opinionsReducer = (state = defaultState.opinions , action) =>{

    switch(action.type){
        case "FETCH_OPINIONS":
            console.log("state: ", state, "action: ", action)
            return action.payload
        case "ADD_OPINION":
            // debugger
            return [...state, action.payload]
        default:
            return state
    }
}

const currentUserReducer = (state = defaultState.currentUser, action) =>{
    switch(action.tye){
        default:
            return state
    }
}



const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    opinions: opinionsReducer
})

export default rootReducer