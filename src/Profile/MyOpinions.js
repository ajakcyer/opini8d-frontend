import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OpinionCard } from '../ReuseComponents/OpinionCard'

class MyOpinions extends Component {

    renderMyOpinions = () =>{
        return this.props.opinionsByMe.map((opinion, index) => <OpinionCard key={index} opinion={opinion}/>)
    }

    render() {
        console.log(this.props)

        return (
            <>

            {this.renderMyOpinions()}
            </>
        )
    }
}

export default MyOpinions;