import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MyOpinions from './MyOpinions'

const Profile = (props) => {
    console.log(props)

    // const myOpinionProps = () =>{
    //     // debugger
    //     return props.opinions.filter(opinion => opinion.user.id === props.currentUser.id)
    // }

    // console.log(myOpinionProps())
    // debugger
    return (
        <div className="my-opinions">
            <h2>{props.userObj ? 
            props.userObj.username
            
            : props.currentUser.username}</h2>
            <h1>{props.userObj ? "Opinions:" : "My Opinions:"}</h1>


            <MyOpinions opinionsByUser={props.userOpinions} opinionsByMe={props.userObj ? props.userOpinions : props.opinions}/>
        </div>
    )
}

const msp = (state) => {
    return { currentUser: state.currentUser };
  };

  export default connect(msp)(Profile);
