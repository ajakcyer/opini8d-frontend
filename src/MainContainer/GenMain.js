import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import AuthCont from "../Auth/AuthCont"
import Main from "./Main"
import { userLoggedIn } from '../Redux/action';
import ConversationList from '../Messages/ConversationsCables';
import MessageArea from '../Messages/MessageArea';
import { ActionCableProvider } from 'react-actioncable-provider'


class GenMain extends Component {

  componentDidMount = () => {
    if (this.props.location.pathname === "/"){
      if (localStorage.getItem('token')){
        this.props.history.push('/explore/opinions')
      } else {
        this.props.history.push('/auth/login')
      }
    }
    return this.props.userToken()
  }

  componentDidUpdate = (prevProps) =>{
    if (this.props.currentUser !== prevProps.currentUser){
      if (this.props.currentUser && prevProps.currentUser){
        if (prevProps.currentUser.username === this.props.currentUser.username){
          // debugger
          return null
        }
      } else if (!this.props.currentUser){
        this.props.history.push('/auth/login')
      } else {
        this.props.history.push('/explore/opinions')

      }
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

        {/* {this.props.currentUser ?  */}
        {localStorage.getItem('token') ?
        <>
        <ActionCableProvider url={"ws://localhost:3000/cable"}>
          <Route path="/explore" render={()=> <Main/>} />
          <Route path="/messages" render={()=> <ConversationList/>}/>
        </ActionCableProvider>
          {/* <Route
            path="/messages/:id" exact
            render={({ match }) => {
              let urlId = parseInt(match.params.id);
              let foundConversation = this.props.conversations.find(
                (conversation) => conversation.id === urlId
              )
                // debugger
                return <MessageArea conversationObj={foundConversation} />
              
            }}
          /> */}
        </>
        
        :
        <>
        <Route path="/auth" render={()=> <AuthCont/>}/>
        <Redirect to="/auth/login" />

        </>
        }


      </Switch>
      
      </>
    )
  }
}


const msp =(state)=>{
    return ({currentUser: state.currentUser,
            conversations: state.conversations})
}

const mdp = (dispatch) =>{
  return {userToken: () => dispatch(userLoggedIn())}
}

export default withRouter(connect(msp, mdp)(GenMain));
