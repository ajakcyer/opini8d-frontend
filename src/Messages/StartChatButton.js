import React, { Component } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'
import { AiFillMail } from "react-icons/ai";

class StartChatButton extends Component {

    fetchWebSocket = (route, bodyData) =>{
        // debugger
        fetch(`http://localhost:3000/api/v1/${route}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bodyData)
        })
        // .then( r=>r.json())
        // .then(data => {
        //     debugger
        //     this.props.appendNewConvo(data)
        // })
    }

    conversationExists = (receiverId)=>{
        return this.props.conversations.find(conversation => conversation.user_conversations.some(uc => uc.user.id === receiverId ))
    }

    clickHandler = () =>{
        let body = {
            // title: "PRIVATE",
            sender_id: this.props.currentUser.id,
            receiver_id: this.props.user.id
        }

        if(this.conversationExists(this.props.user.id)){
            alert('Conversation Exists!')
            return
            // this.props.exit()
        } else {
            this.fetchWebSocket("conversations", body)
            alert('New Convo creating...')
            // this.props.exit()
        }
    }

    handleReceivedConversation = (response)=>{
        const {conversation} = response
        // debugger
        if (conversation.user_conversations.map( uc => uc.user.id).includes(this.props.currentUser.id)){
            // debugger
            this.props.appendNewConvo(conversation)
        }
    }

    render() {
        console.log(this.props)
        return (
            <>
                <ActionCableConsumer 
                    channel={{channel: 'ConversationsChannel'}}
                    onReceived={(response)=> this.handleReceivedConversation(response)}
                />
                <p onClick={this.clickHandler}><AiFillMail/></p>
            </>
        )
    }
}

const msp = (state) =>{
    return ({currentUser: state.currentUser,
            conversations: state.conversations})
}

const mdp = (dispatch) =>{
    return ({appendNewConvo: (conversation)=> dispatch({type: "ADD_CONVO", payload: conversation})})
}

export default connect(msp, mdp)(StartChatButton)