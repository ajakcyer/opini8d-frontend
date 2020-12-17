const token = localStorage.getItem('token')


export const fetchOpinionsFromApi = (data) => {
  return { type: "FETCH_OPINIONS", payload: data };
};

export const addOpinionToApi = (opinion) => {
  return (dispatch) => {
    // debugger
    fetch("http://localhost:3000/api/v1/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: opinion.userId,
        title: opinion.title,
        content: opinion.content,
      }),
    })
      .then((r) => r.json())
      .then((data) => dispatch({ type: "ADD_OPINION", payload: data }));

    // return({type: "ADD_OPINION", payload: opinion})
  };
};

export const editOpinion = (opinion) => {
  // debugger
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/opinions/${opinion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: opinion.title,
        content: opinion.content,
      }),
    })
      .then((r) => r.json())
      .then((data) => dispatch({ type: "EDIT_OPINION", payload: data }));
  };
};

export const deleteOpinion = (opinion) => {
  // debugger
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/opinions/${opinion.id}`, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((r) => r.json())
      .then((data) => dispatch({ type: "DELETE_OPINION", payload: opinion }));
  };
};

export const opinionRated = (opinion) => {
//   debugger;
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: opinion.userId,
        opinion_id: opinion.id,
        agreeable: opinion.agreeable,
      }),
    })
      .then((r) => r.json())
      .then((data) => {

        // debugger
        dispatch({
          type: "RATE_OPINION",
          payload: {
            id: data.id,
            opinion_id: data.opinion.id,
            user_id: data.user.id,
            agreeable: data.agreeable
          },
        });
      });
  };
};

export const patchRating = (rating) =>{
    // debugger
    return (dispatch) =>{
        fetch(`http://localhost:3000/api/v1/ratings/${rating.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                agreeable: rating.agreeable
            })
        })
        .then(r=>r.json())
        .then(data => {
            // debugger
            dispatch({
                type: "EDIT_RATING",
                payload: {
                    id: data.id,
                    opinion_id: data.opinion.id,
                    user_id: data.user.id,
                    agreeable: data.agreeable
                }
            })
        })
    }
}

export const deleteRating = (rating)=>{
    // debugger
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/ratings/${rating.id}`,{
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(r=>r.json())
        .then(data => {
            dispatch({
                type: "DELETE_RATING",
                payload: rating
            })
        })
    }
}

export const loginAction = (userInfo) =>{
  // debugger
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(r=>r.json())
    .then(data => {
      // debugger
        if (data.error){
          alert("Username and/or password is incorrect")
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch({type: "LOGIN", payload: data.user})
        }
  })
  }
}

export const signupAction = (userInfo) =>{
  // debugger
  return (dispatch) =>{
    fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user:
        {first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password}
      })
    })
    .then(r=>r.json())
    .then(data => dispatch({type: "SIGNUP", payload: data}))
  }
}

export const logoutAction = ()=>{
  return {type: "LOGOUT"}
}

export const userLoggedIn = () =>{
  return (dispatch) =>{
    // const token = localStorage.getItem('token')
    fetch("http://localhost:3000/api/v1/profile", {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(r=>r.json())
    .then(data => {
      // debugger
        if(data.user){
          dispatch({type: "USER_LOGGED_IN", payload: data.user})
        }
    })
  }
}