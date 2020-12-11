import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import { AuthCont } from "../Auth/AuthCont"
import { Main } from "./Main"

const GenMain = (props) => {

    // if user is logged in
    // const currentUserID = 2

console.log(props)
  return (
    <>
    {props.currentUser ? 
    <Main />
    :
    <AuthCont/>
    }
    </>
  );
};

const msp =(state)=>{
    return ({currentUser: state.currentUser})
}

export default connect(msp)(GenMain);
