import React from 'react'
import { AllOpinions } from '../ExplorePage/AllOpinions'
import { Profile } from '../Profile/Profile'

export const Main = () => {
    return (
        <div>
            <h1>Main (logged in) Component Container</h1>
            <Profile/>
            <hr></hr>
            <AllOpinions/>
        </div>
    )
}
