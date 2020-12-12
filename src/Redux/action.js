
export const fetchOpinionsFromApi = (data) =>{
    return ({type: "FETCH_OPINIONS", payload: data})
}

export const addOpinionToApi = (opinion) =>{
    return (dispatch) => {
        // debugger
        fetch("http://localhost:3000/api/v1/opinions",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: opinion.userId,
                title: opinion.title,
                content: opinion.content
            })
        })
        .then(r=>r.json())
        .then(data => dispatch({type: "ADD_OPINION", payload: data}))
        
        // return({type: "ADD_OPINION", payload: opinion})
    }
}

export const rateOpinion = (data) =>{
    
    
}