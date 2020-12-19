import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateOpinion from '../ReuseComponents/CreateOpinion'
import { OpinionCard } from '../ReuseComponents/OpinionCard'

class MyOpinions extends Component {

    renderMyOpinions = () =>{
        return this.props.opinionsByMe.map((opinion, index) => <OpinionCard key={index} opinion={opinion}/>)
    }

    render() {
        // console.log(this.props)

        return (
            <>

            {this.renderMyOpinions()}
            {this.props.opinionsByUser ? null : 
            <CreateOpinion/>}
            </>
        )
    }
}

export default MyOpinions;