
export const fetchOpinionsFromApi = (data) =>{
    return ({type: "FETCH_OPINIONS", payload: data})
}

export const addOpinionToApi = (opinion) =>{
    return({type: "ADD_OPINION", payload: opinion})
}