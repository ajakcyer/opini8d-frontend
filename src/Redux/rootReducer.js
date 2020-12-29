import { combineReducers } from "redux";


const defaultState = {
    currentUser: null,
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
        case "EDIT_RATING":
            // debugger
            let copy = [...state]
            const opIndex = copy.findIndex(opinion => opinion.id === action.payload.opinion_id)
            let ratingIndex = copy[opIndex].ratings.findIndex(rating => rating.id === action.payload.id)
            copy[opIndex].ratings[ratingIndex] = action.payload
            return copy
        case "DELETE_RATING":
            // debugger
            let arrayCopied = [...state]
            const indexO = arrayCopied.findIndex(opinion => opinion.id === action.payload.opinionId)
            let indexR = arrayCopied[indexO].ratings.findIndex(rating => rating.id === action.payload.id)
            arrayCopied[indexO].ratings.splice(indexR, 1)
            return arrayCopied
        default:
            return state
    }
}

const currentUserReducer = (state = defaultState.currentUser, action) =>{
    switch(action.type){
        case "USER_LOGGED_IN":
            // debugger
            return action.payload
        case "LOGIN":
            // debugger
            return action.payload
        case "SIGNUP":
            // debugger
            return action.payload
        case "UNFOLLOW":
            // debugger
            let userCopy = {...state}
            let indexC = userCopy.categories.findIndex(category => category.id === action.payload.category_id)
            userCopy.categories.splice(indexC, 1)
            let indexUC = userCopy.user_categories.findIndex(uc => uc.id === action.payload.uc_id)
            userCopy.user_categories.splice(indexUC, 1)
            // debugger
            return userCopy
        case "FOLLOW":
            debugger
        break
        case "LOGOUT":
            // debugger
            return null
        default:
            return state
    }
}



const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    opinions: opinionsReducer
})

export default rootReducer