import React, { Component } from 'react'
import { connect } from "react-redux";
import {addOpinionToApi} from '../Redux/action'
// import Modal from 'react-bootstrap/Modal'
import { Button, Modal, Form, Dropdown, Dimmer, Loader} from 'semantic-ui-react';
// import Form from 'react-bootstrap/Form'
import { RiImageAddFill } from "react-icons/ri";



class CreateOpinion extends Component {

    state = {
        title: "",
        content: "",
        userId: this.props.currentUser.id,
        otherImage: null,
        show: false,
        loading: false,
        categoryArray: []
    }

    onChangeHandler = (e) =>{
        // debugger
        this.setState(prev=>({
            [e.target.name]: e.target.value
        }))
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        // console.log(this.state)
        // debugger
        if (this.state.title.length > 0 && this.state.content.length > 0 ){
            
            this.props.addOpinion({
                title: this.state.title,
                content: this.state.content,
                userId: this.state.userId,
                otherImage: this.state.otherImage,
                categoryArray: this.state.categoryArray
            })
    
            this.setState(prev => ({
                title: "",
                content: "",
                otherImage: null,
                loading: true,
                categoryArray: []
            }))
    
            setTimeout(() => {
                this.setState(prev=>({loading: false, show: false}))
            }, 500);
    
            e.target.querySelectorAll('a').forEach(node => node.remove())
        } else {
            alert('Please include a title and content')
        }
    }

    imageChangeHandler = (e) =>{
        // debugger
        this.setState(prev=>({
            otherImage: e.target.files[0]
        }))
    }

    dropDownChangeHandler = (e) =>{

        if(e.target.classList.contains('item')){
            let text = e.target.innerText
            let copiedArray = [...this.state.categoryArray]
            copiedArray.push(text)
            this.setState(prev=>({
                categoryArray: copiedArray
            }), ()=> console.log(this.state.categoryArray))
        } else if (e.target.classList.contains('delete')){
            let cat = e.target.parentNode.innerText
            let copy = [...this.state.categoryArray]
            let catIndex = copy.findIndex(el => el === cat)
            copy.splice(catIndex, 1)
            this.setState(prev=>({
                categoryArray: copy
            }), ()=> console.log(this.state.categoryArray))
            // debugger
        }

        // debugger
        // let allA = e.target.parentNode.parentNode.querySelectorAll("a")

        // debugger
    }

    handleClose = (e) => {
        // debugger
        this.setState(prev => ({
            title: "",
            content: "",
            otherImage: null,
            show: false,
            categoryArray: []
        }))
        if (e.target.classList.contains('modals')){
            e.target.querySelector('.content').querySelectorAll('a').forEach(node => node.remove())
        } else {
            e.target.parentNode.parentNode.querySelector('.content').querySelectorAll('a').forEach(node => node.remove())
        }

        // this.setState(prev=>({show: false}))
    }

    handleShow = () => this.setState(prev=>({show: true}))

    categoryArrayObj = () =>{
        let array = []
        this.props.categories.forEach(cat => {
            let object = {key: cat, text: cat, value: cat}
            array.push(object)           
        });

        // debugger
        return <Dropdown onChange={this.dropDownChangeHandler} placeholder="Category" fluid multiple selection options={array} />
        // return array
    }

    render() {
        console.log(this.props)
        return (
            <>
                {/* <Button onClick={this.handleShow}>Add Your Opinion</Button> */}
                {/* {this.categoryArrayObj()} */}
                <Modal
                className="create-form"
                size="tiny"
                open={this.state.show}
                onClose={(e)=> this.handleClose(e)}
                onOpen={()=> this.handleShow()}
                centered={false}
                trigger={<Button>Add Your Opinion</Button>}
                >
                    <Modal.Header>Opinion</Modal.Header>
                    <Modal.Content>
                        <Dimmer inverted active={this.state.loading} >
                        <Loader content="Loading" size="large"/>

                        </Dimmer>

                        <Form onSubmit={this.onSubmitHandler}>
                            <Form.Input
                            name="title"
                            placeholder="Title"
                            onChange={this.onChangeHandler}
                            value={this.state.title}
                            />

                            <Form.TextArea
                            name="content"
                            className="text-area"
                            placeholder="What's your opinion?..."
                            onChange={this.onChangeHandler}
                            value={this.state.content}
                            />

                            <label className="label-image" htmlFor="opinion-photo"> <RiImageAddFill/></label>
                            <input id="opinion-photo" onChange={this.imageChangeHandler} type="file" accept="image/*" style={{display: "none"}}/>
                            <br></br>
                            {this.categoryArrayObj()}
                            <br></br>
                            <br></br>
                            <Button positive>Post!</Button>
                            {/* <Form.Control placeholder="Title" /> */}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                        negative
                        onClick={(e)=> this.handleClose(e)}>
                            Cancel
                        </Button>
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