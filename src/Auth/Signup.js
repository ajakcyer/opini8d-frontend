import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signupAction } from '../Redux/action'

class Signup extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    }


    onChangeHandler = (e) =>{
        this.setState(prev=>({
            [e.target.name]: e.target.value
        }))
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        console.log("Submitted!: ", this.state)
        this.props.signup(this.state)
        this.props.history.push('/opinions')
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <h1>Sign up Component</h1>
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.onChangeHandler} type="text" name="firstName" placeholder="First Name" value={this.state.firstName} />
                <input onChange={this.onChangeHandler} type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} />
                <input onChange={this.onChangeHandler} type="email" name="email" placeholder="Email" value={this.state.email} />
                <br></br>
                <input onChange={this.onChangeHandler} type="text" name="username" placeholder="Username" value={this.state.username} />
                <input onChange={this.onChangeHandler} type="text" name="password" placeholder="Password" value={this.state.password} />
                <br></br>
                <button>Sign Up</button>
            </form>
            <br></br>
            <NavLink to="/login">
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