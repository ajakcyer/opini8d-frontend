import { combineReducers } from "redux";


const defaultState = {
    currentUser: 2,
    opinions: []
}


const opinionsReducer = (state = defaultState.opinions , action) =>{

    switch(action.type){
        case "FETCH_OPINIONS":
            // console.log("state: ", state, "action: ", action)
            return action.payload
        case "ADD_OPINION":
            // debugger
            return [...state, action.payload]
        case "EDIT_OPINION":
            // debugger
            let copiedArray = [...state]
            const opinionIndex = copiedArray.findIndex(opinion => opinion.id === action.payload.id)
            copiedArray[opinionIndex] = action.payload
            return copiedArray
        case "DELETE_OPINION":
            let cArray = [...state]
            const oIndex = cArray.findIndex(opinion => opinion.id === action.payload.id)
            // debugger
            cArray.splice(oIndex, 1)
            return cArray
        case "RATE_OPINION":
            // debugger
            let sameArray = [...state]
            const index = sameArray.findIndex(opinion => opinion.id === action.payload.opinion_id)
            sameArray[index].ratings.push(action.payload)
            return sameArray
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