import { combineReducers } from "redux";


const defaultState = {
    currentUser: null,
    opinions: [],
    categories: [],
    conversations: []
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
            // debugger
            let uCopy = {...state}
            uCopy.categories.push(action.payload.category)
            uCopy.user_categories.push(action.payload.uc)
            // debugger
            return uCopy
        case "LOGOUT":
            // debugger
            return null
        default:
            return state
    }
}

const categoriesReducer = (state = defaultState.categories, action) =>{
    switch (action.type) {
        case "FETCH_CATEGORIES":
            // debugger
            return action.payload
        default:
            return state
    }
}

const conversationsReducer = (state = defaultState.conversations, action) =>{
    switch (action.type){
        case "FETCH_CONVERSATIONS":
            // debugger
            return action.payload
        case "RECEIVED_CONVERSATION":
            // debugger
            let copyConvos = [...state]
            let existing = copyConvos.find(convo => convo.id === action.payload.id)
            if (existing){
                let foundConvoIndex = copyConvos.indexOf(existing)
                copyConvos[foundConvoIndex] = action.payload
                return copyConvos
            } else {
                // debugger
                return [...state, action.payload]
            }
        case "NEW_MESSAGE":
            // debugger
            let copiedConvos = [...state]
            let indexOfConvo = copiedConvos.findIndex(convo => convo.id === action.payload.id)
            copiedConvos[indexOfConvo] = action.payload
            // debugger
            return copiedConvos
        case "ADD_CONVO":
            // debugger
            let copyC = [...state]
            let existingC = copyC.find(convo => convo.id === action.payload.id)
            if (existingC){
                let foundConvoI = copyC.indexOf(existingC)
                copyC[foundConvoI] = action.payload
                return copyC
            } else {
                // debugger
                return [...state, action.payload]
            }
        default:
            return state
    }

}


const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    opinions: opinionsReducer,
    categories: categoriesReducer,
    conversations: conversationsReducer
})

export default rootReducer