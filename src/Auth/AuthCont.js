import React from 'react'
import { Login } from './Login'
import { Signup } from './Signup'

export const AuthCont = () => {
    return (
        <div>
            <h1>Auth (not logged in) Component Container</h1>
            <Login/>
            <hr></hr>
            <Signup/>
        </div>
    )
}
