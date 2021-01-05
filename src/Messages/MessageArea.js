import React, { Component } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'

class MessageArea extends Component {

    state = {
        text: ""
    }

    renderOtherUserName = () =>{
        let otherUser = this.props.conversationObj.user_conversations.find(uc => uc.user.id !== this.props.currentUser.id )
        // debugger
        return otherUser
    }

    renderMessages = () =>{
        return this.props.conversationObj.messages.map((message, index) => {
            let date = new Date (message.created_at).toLocaleString()
            if (message.user_id === this.props.currentUser.id){
                return (
                <div className="my-message">  
                    <li key={index} >{message.text}</li>
                    <p className="time">{date}</p>
                
                </div>)
            } else {
                return (
                <div className="their-message">
                    <li key={index} >{message.text}</li>
                    <p className="time">{date}</p>
                </div>)
            }
        })
    }

    onChangeHandler = (e) =>{
        this.setState(prevState=>({
            text: e.target.value
        }))
    }

    handleReceivedConversation = (response)=>{
        const {conversation} = response
        // debugger
        if (conversation.user_conversations.map( uc => uc.user.id).includes(this.props.currentUser.id)){
            // debugger
            this.props.appendNewMessage(conversation)
        }
    }

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
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        let body = {
            conversation_id: this.props.conversationObj.id,
            text: this.state.text,
            user_id: this.props.currentUser.id,
            receiver_id: this.renderOtherUserName().user.id
        }
        // debugger
        this.fetchWebSocket("messages", body)
        this.setState(prev=>({
            text: ""
        }))
    }

    render() {
        console.log(this.props)
        return (
            <div className="messages">
                <ActionCableConsumer
                    channel={{channel: 'ConversationsChannel'}}
                    onReceived={(response)=> this.handleReceivedConversation(response)}
                
                />
                {this.props.currentUser ? 
                    <>
                        <h1>{this.renderOtherUserName().user.username}</h1>
                        <div className="chat-box">
                            <ul>
                                {this.renderMessages()}
                            </ul>
                        </div>
                            <form onSubmit={this.onSubmitHandler}>
                                <textarea onChange={this.onChangeHandler} placeholder="Send a message" value={this.state.text}></textarea>
                                <button>Submit</button>
                            </form>

                    </>
                
                :
                null
                
                
                }
            </div>
        )
    }
}

const msp = (state) =>{
    return ({currentUser: state.currentUser})
}

const mdp = (dispatch) =>{
    return {appendNewMessage: (conversation) => dispatch({type: "NEW_MESSAGE", payload: conversation})}
}

export default connect(msp, mdp)(MessageArea)