import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { NavLink, Route } from 'react-router-dom';
import MessageArea from './MessageArea';

class ConversationsCables extends Component {

    handleReceivedConversation = (response)=>{
        const {conversation} = response
        // debugger
        if (conversation.user_conversations.map( uc => uc.user.id).includes(this.props.currentUser.id)){
            // debugger
            this.props.appendNewConversation(conversation)
        }
    }

    renderConversations = () =>{
        return this.props.conversations.map((convo, index1) => {
            let names = convo.user_conversations.map((uc, index2)=> uc.user.username)
            // debugger
            return <NavLink key={index1} to={`/explore/messages/${convo.id}`}><li >{names[0] + ' & ' + names[1]}</li></NavLink>
        })
    }

    render() {
        console.log(this.props)
        return (
            <>
                
            
            <div className="messages-container">

                {this.props.currentUser ? 

                <ActionCableConsumer
                    channel={{channel: 'ConversationsChannel'}}
                    onReceived={(response)=> this.handleReceivedConversation(response)}
                />

                :

                null}

                
            

            {this.props.conversations.length > 0 ?

            <>
                <div className="convo-list">
                    <h3>Direct Messages</h3>
                    <ul>

                        {this.renderConversations()}

                    </ul>


                </div>
            </>

        
            :
            
            <h4>No conversations started</h4>
            
            }
            
            {this.props.conversations.length > 0 ? 

            <Route
                path="/explore/messages/:id"
                render={({ match }) => {
                let urlId = parseInt(match.params.id);
                let foundConversation = this.props.conversations.find(
                    (conversation) => conversation.id === urlId
                )
                    // debugger
                    
                    return <MessageArea conversationObj={foundConversation} />

                }}
                />
            :

            null}
            </div>
        </>
        
        )
    }
}

const msp = (state)=>{
    return ({currentUser: state.currentUser,
            conversations: state.conversations})
}

const mdp = (dispatch) =>{
    return {appendNewConversation: (conversation) => dispatch({type: "RECEIVED_CONVERSATION", payload: conversation})}
}

export default connect(msp, mdp)(ConversationsCables)