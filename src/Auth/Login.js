import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginAction } from '../Redux/action'

class Login extends Component {

    state = {
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
        this.props.login(this.state)
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <h1>Login Component</h1>
                <form onSubmit={this.onSubmitHandler} >
                    <input onChange={this.onChangeHandler} type="text" name="username" value={this.state.username} />
                    <br></br>
                    <input onChange={this.onChangeHandler} type="text" name="password" value={this.state.password} />
                    <br></br>
                    <button>Log in</button>
                </form>
            </div>
        )
    }
}

const mdp = (dispatch) =>{
    return {login: (userInfo) => dispatch(loginAction(userInfo))}
}

export default connect(null, mdp)(Login);