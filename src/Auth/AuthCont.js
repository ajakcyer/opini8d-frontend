import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'



class AuthCont extends Component {

    userLoggedIn = () =>{
        if (this.props.currentUser){
            return this.props.history.push('/opinions')
        } else {
            return this.props.history.push('/login')
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Auth (not logged in) Component Container</h1>
                <Switch>
                    <Route path="/auth/login" render={()=> <Login/>} />
                    <Route path="/auth/signup" render={()=> <Signup/>} />
                    <Route path="/" component={() => {
                        return (
                            <>
                                <NavLink to="/auth/login">
                                    Login
                                </NavLink>
                                <br></br>

                                <NavLink to="/auth/signup">
                                    Sign Up
                                </NavLink>
                            </>
                        )
                    }}/>
                </Switch>

                
                

                {/* <Login/> */}
                <hr></hr>
                {/* <Signup/> */}
                
            </div>
        )
    }
}

const msp = (state) =>{
    return {currentUser: state.currentUser}
}

export default withRouter( connect(msp)(AuthCont))