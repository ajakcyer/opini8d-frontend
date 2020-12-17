import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import AuthCont from "../Auth/AuthCont"
import Main from "./Main"

class GenMain extends Component {

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

        {this.props.currentUser ? 
        
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

export default withRouter(connect(msp)(GenMain));
