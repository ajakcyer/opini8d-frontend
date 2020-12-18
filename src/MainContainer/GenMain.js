import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import AuthCont from "../Auth/AuthCont"
import Main from "./Main"
import { userLoggedIn } from '../Redux/action';

class GenMain extends Component {

  componentDidMount = () => {
    if (this.props.location.pathname === "/"){
      if (localStorage.getItem('token')){
        this.props.history.push('/explore/opinions')
        console.log('testing checkout')
      } else {
        this.props.history.push('/auth/login')
      }
    }
    return this.props.userToken()
  }

  componentDidUpdate = (prevProps) =>{
    if (this.props.currentUser !== prevProps.currentUser){
      this.props.history.push('/explore/opinions')
    }
  }

  render() {
    console.log("Rerender GenMain", this.props.currentUser)
    return (
      
      <>
      {/* {this.props.currentUser ? 
  
      this.props.history.push('/explore')
      :
      
      this.props.history.push('/auth')
      // this.props.history.push('/login')
      } */}

      <Switch>
        <Route path="/auth" render={()=> <AuthCont/>}/>

        {/* {this.props.currentUser ?  */}
        {localStorage.getItem('token') ?
        
        <Route path="/explore" render={()=> <Main/>} />
        
        :

        <Redirect to="/auth/login" />
        }


      </Switch>
      </>
    )
  }
}


const msp =(state)=>{
    return ({currentUser: state.currentUser})
}

const mdp = (dispatch) =>{
  return {userToken: () => dispatch(userLoggedIn())}
}

export default withRouter(connect(msp, mdp)(GenMain));
