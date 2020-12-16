import React, { Component } from 'react'
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import AuthCont from "../Auth/AuthCont"
import Main from "./Main"

class GenMain extends Component {



  render() {
    return (
      
      <>
      {this.props.currentUser ? 
  
      <Main />
      :
      
      <AuthCont/>
    
      }
      </>
    )
  }
}


const msp =(state)=>{
    return ({currentUser: state.currentUser})
}

export default withRouter(connect(msp)(GenMain));
