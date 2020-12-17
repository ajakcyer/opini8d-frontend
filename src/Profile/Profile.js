import React from 'react'
import { connect } from 'react-redux'
import MyOpinions from './MyOpinions'

const Profile = (props) => {
    console.log(props)

    // const myOpinionProps = () =>{
    //     // debugger
    //     return props.opinions.filter(opinion => opinion.user.id === props.currentUser.id)
    // }

    // console.log(myOpinionProps())
    return (
        <div className="my-opinions">
            <h1>Opinions by {props.currentUser.username}</h1>
            <MyOpinions opinionsByMe={props.opinions}/>
        </div>
    )
}

const msp = (state) => {
    return { currentUser: state.currentUser };
  };

  export default connect(msp)(Profile);
