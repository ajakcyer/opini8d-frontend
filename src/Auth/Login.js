import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Form, Input } from 'semantic-ui-react'
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
        // this.props.history.push('/explore/opinions')
    }

    render() {
        // console.log(this.props)
        return (
            <div className="auth-login-c">
                <h1>Login</h1>
                <Form className="auth-login-form" onSubmit={this.onSubmitHandler} >
                    <Input onChange={this.onChangeHandler} type="text" name="username" placeholder="Username" value={this.state.username} />
                    <br></br>
                    <Input onChange={this.onChangeHandler} type="password" name="password" placeholder="Password" value={this.state.password} />
                    <br></br>
                    <Button color="violet">Log in</Button>
                </Form>
                <br></br>
                <NavLink to="/auth/signup">
                    Create an Account
                </NavLink>
            </div>
        )
    }
}

const mdp = (dispatch) =>{
    return {login: (userInfo) => dispatch(loginAction(userInfo))}
}

export default withRouter(connect(null, mdp)(Login));