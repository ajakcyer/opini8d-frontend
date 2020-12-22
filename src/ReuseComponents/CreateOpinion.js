import React, { Component } from 'react'
import { connect } from "react-redux";
import {addOpinionToApi} from '../Redux/action'


class CreateOpinion extends Component {

    state = {
        title: "",
        content: "",
        userId: this.props.currentUser.id,
        otherImage: null
    }

    onChangeHandler = (e) =>{
        this.setState(prev=>({
            [e.target.name]: e.target.value
        }))
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        // console.log(this.state)
        debugger
        this.props.addOpinion(this.state)
        this.setState(prev => ({
            title: "",
            content: "",
            otherImage: null
        }))
    }

    imageChangeHandler = (e) =>{
        // debugger
        this.setState(prev=>({
            otherImage: e.target.files[0]
        }))
    }

    render() {
        // console.log(this.props)
        return (
            <div>
            <h3>Create an Opinion</h3>
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.imageChangeHandler} type="file" accept="image/*"/>
                <br></br>
                <input name="title" type="text" placeholder="Title" onChange={this.onChangeHandler} value={this.state.title}/>
                <br></br>
                <textarea name="content" placeholder="What's your opinion?..." onChange={this.onChangeHandler} value={this.state.content}/>
                <br></br>
                <button>Post!</button>
            </form>
        </div>
        )
    }
}


const mdp = (dispatch) =>{
    return ({addOpinion: (data) => dispatch(addOpinionToApi(data))})
}

const msp = (state) =>{
    return ({currentUser: state.currentUser})
}

export default connect(msp, mdp)(CreateOpinion)