import { combineReducers } from "redux";


const defaultState = {
    opinions: []
}


const opinionsReducer = (state = defaultState.opinions , action) =>{

    switch(action.type){
        case "FETCH_OPINIONS":
            // debugger
            console.log("state: ", state, "action: ", action)
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    opinions: opinionsReducer
})

export default rootReducer