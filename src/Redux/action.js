// const token = localStorage.getItem('token')

export const fetchCategories = () =>{
  return (dispatch) =>{
    fetch("http://localhost:3000/api/v1/categories")
    .then(r=>r.json())
    .then(data => {
      let catName = data.map(category => category.name)

      // debugger
      dispatch({type: "FETCH_CATEGORIES", payload: catName})
      // dispatch({type: "FETCH_CATEGORIES", payload: data})
    })
  }
}


export const fetchOpinionsFromApi = (data) => {
  return { type: "FETCH_OPINIONS", payload: data };
};

export const addOpinionToApi = (opinion) => {
  // debugger
  return (dispatch) => {
    const token = localStorage.getItem('token')

    const formData = new FormData();
    formData.append('user_id', opinion.userId);
    formData.append('title', opinion.title);
    formData.append('content', opinion.content);
    formData.append('other_image', opinion.otherImage);
    formData.append('category_array', opinion.categoryArray)

    // fetch("http://localhost:3000/api/v1/users", {
    //   method: 'POST',
    //   // headers: {
    //   //   'Content-Type': undefined,
    //   //   'Accept': 'application/json'
    //   // },
    //   body: formData /* JSON.stringify({ user:
    //     {first_name: userInfo.firstName,
    //     last_name: userInfo.lastName,
    //     email: userInfo.email,
    //     username: userInfo.username,
    //     password: userInfo.password,
    //     avatar: userInfo.avatar}
    //   }) */
    // })

    // debugger
    fetch("http://localhost:3000/api/v1/opinions", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData /* JSON.stringify({
        user_id: opinion.userId,
        title: opinion.title,
        content: opinion.content,
      }) */
    })
      .then((r) => r.json())
      .then((data) => {
        // debugger
        dispatch({ type: "ADD_OPINION", payload: data })
      
      });

    // return({type: "ADD_OPINION", payload: opinion})
  };
};

export const editOpinion = (opinion) => {
  // debugger
  return (dispatch) => {
    const token = localStorage.getItem('token')

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
    const token = localStorage.getItem('token')

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
    const token = localStorage.getItem('token')

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
      const token = localStorage.getItem('token')

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
      const token = localStorage.getItem('token')

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
  return (dispatch) =>{
    const formData = new FormData();
    formData.append('first_name', userInfo.firstName);
    formData.append('last_name', userInfo.lastName);
    formData.append('email', userInfo.email);
    formData.append('username', userInfo.username);
    formData.append('password', userInfo.password);
    formData.append('avatar', userInfo.avatar);
    
    // debugger

    fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      // headers: {
      //   'Content-Type': undefined,
      //   'Accept': 'application/json'
      // },
      body: formData /* JSON.stringify({ user:
        {first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password,
        avatar: userInfo.avatar}
      }) */
    })
    .then(r=>r.json())
    .then(data => {
      // debugger
      if (data.user){
        localStorage.setItem('token', data.jwt)
        dispatch({type: "SIGNUP", payload: data.user})
      }
    })
  }
}

export const logoutAction = ()=>{
  return {type: "LOGOUT"}
}

export const userLoggedIn = () =>{
  return (dispatch) =>{
    const token = localStorage.getItem('token')
    
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

export const unfollowCategory = (object) =>{
  // debugger
  return (dispatch) =>{
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/api/v1/user_categories/${object.id}`,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(r=>r.json())
    .then(data => {
      // debugger
      dispatch({type: "UNFOLLOW", payload: data})

    })
  }
}

export const followCategory = (object) =>{
  return (dispatch) =>{
    const token = localStorage.getItem('token')
    // debugger
    fetch("http://localhost:3000/api/v1/user_categories", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: object.user.id,
        category: object.category
      })
    })
    .then(r=>r.json())
    .then(data => {
      // debugger
      dispatch({type: "FOLLOW", payload: data})
    })
  }
}