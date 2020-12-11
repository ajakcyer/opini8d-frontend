import React, { Component } from 'react'

import { connect } from "react-redux";
import {addOpinionToApi} from '../Redux/action'


class CreateOpinion extends Component {
    render() {
        return (
            <div>
            <h3>Create an Opinion</h3>
            <form>
                <input type="text" placeholder="Title"/>
                <br></br>
                <textarea placeholder="What's your opinion?..."/>
                <br></br>
                <button>Post!</button>
            </form>
        </div>
        )
    }
}


const mdp = (dispatch) =>{
    return ({addOpinion: (data)=> dispatch(addOpinionToApi(data))})
}

export default connect(null, mdp)(CreateOpinion)