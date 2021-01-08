import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signupAction } from '../Redux/action'
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import { BsPersonBoundingBox } from "react-icons/bs";

class Signup extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        avatar: null
    }


    onChangeHandler = (e) =>{
        this.setState(prev=>({
            [e.target.name]: e.target.value
        }))
    }

    imageChangeHandler = (e) =>{
        // debugger
        this.setState(prev=>({
            avatar: e.target.files[0]
        }))
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        console.log("Submitted!: ", this.state)
        this.props.signup(this.state)
        // this.props.history.push('/explore/opinions')
    }
// smile outline
    render() {
        // console.log(this.props)
        return (
            <div className="auth-signin-c">
                <h1>Sign Up</h1>
            <Form className="auth-signin-form" onSubmit={this.onSubmitHandler}>
                <label htmlFor="user-sign-image"
                className="user-image-label"
                style={this.state.avatar ? {color: "black"} : {color: "white"}}
                ><BsPersonBoundingBox/></label>
                <input id="user-sign-image" onChange={this.imageChangeHandler} type="file" name="avatar" accept="image/*" style={{display: "none"}} />
                <br></br>
                <Input onChange={this.onChangeHandler} type="text" name="firstName" placeholder="First Name" value={this.state.firstName} />
                <Input onChange={this.onChangeHandler} type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} />
                <br></br>
                <Input onChange={this.onChangeHandler} type="email" name="email" placeholder="Email" value={this.state.email} />
                <br></br>
                <Input onChange={this.onChangeHandler} type="text" name="username" placeholder="Username" value={this.state.username} />
                <Input onChange={this.onChangeHandler} type="password" name="password" placeholder="Password" value={this.state.password} />
                <br></br>
                <Button color="violet">Sign Up</Button>
            </Form>
            <br></br>
            <NavLink to="/auth/login">
                Already have an account?
            </NavLink>
            </div>
        )
    }
}

const mdp = (dispatch) =>{
    return {signup: (userInfo) => dispatch(signupAction(userInfo))}
}

export default connect(null , mdp)(Signup) 