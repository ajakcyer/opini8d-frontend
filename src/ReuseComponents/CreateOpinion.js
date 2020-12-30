import React, { Component } from 'react'
import { connect } from "react-redux";
import {addOpinionToApi} from '../Redux/action'
// import Modal from 'react-bootstrap/Modal'
import { Button, Modal } from 'semantic-ui-react';



class CreateOpinion extends Component {

    state = {
        title: "",
        content: "",
        userId: this.props.currentUser.id,
        otherImage: null,
        show: false
    }

    onChangeHandler = (e) =>{
        this.setState(prev=>({
            [e.target.name]: e.target.value
        }))
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        // console.log(this.state)
        // debugger
        this.props.addOpinion({
            title: this.state.title,
            content: this.state.content,
            userId: this.state.userId,
            otherImage: this.state.otherImage
        })

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

    handleClose = () => this.setState(prev=>({show: false}))

    handleShow = () => this.setState(prev=>({show: true}))

    render() {
        console.log(this.props)
        return (
            <>
                {/* <Button onClick={this.handleShow}>Add Your Opinion</Button> */}

                <Modal
                open={this.state.show}
                onClose={()=> this.handleClose()}
                onOpen={()=> this.handleShow()}
                centered={false}
                trigger={<Button>Add Your Opinion</Button>}
                >
                    <Modal.Header>Opinion</Modal.Header>
                    <Modal.Content>

                    </Modal.Content>
                    <Modal.Actions>
                        
                    </Modal.Actions>
                </Modal>

                {/* <h4 className="black-h4">Create an Opinion</h4>
                <form onSubmit={this.onSubmitHandler}>
                    <label htmlFor="opinion-photo"> Click to add a photo</label>
                    <input id="opinion-photo" onChange={this.imageChangeHandler} type="file" accept="image/*" style={{display: "none"}}/>
                    <br></br>
                    <input name="title" type="text" placeholder="Title" onChange={this.onChangeHandler} value={this.state.title}/>
                    <br></br>
                    <textarea name="content" placeholder="What's your opinion?..." onChange={this.onChangeHandler} value={this.state.content}/>
                    <br></br>
                    <button>Post!</button>
                </form> */}
            </>
        )
    }
}


const mdp = (dispatch) =>{
    return ({addOpinion: (data) => dispatch(addOpinionToApi(data))})
}

const msp = (state) =>{
    return ({currentUser: state.currentUser,
            categories: state.categories
    })
}

export default connect(msp, mdp)(CreateOpinion)