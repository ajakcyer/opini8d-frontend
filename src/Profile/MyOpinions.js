import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateOpinion from '../ReuseComponents/CreateOpinion'
import { OpinionCard } from '../ReuseComponents/OpinionCard'
import { Card, Sticky, Ref, Placeholder, Grid } from 'semantic-ui-react'


class MyOpinions extends Component {

    renderMyOpinions = () =>{
        return this.props.opinionsByMe.map((opinion, index) => <Card key={index} style={{ height: '150px'}}><OpinionCard key={index} opinion={opinion}/></Card> )
    }

    render() {
        // console.log(this.props)

        return (
            <>
            <Card.Group style={{'margin': '0 0 4%'}} centered itemsPerRow={3}>
                {this.renderMyOpinions()}
            </Card.Group>

            {this.props.opinionsByUser ? null : 
            <div className="sticky-opinion">

                <CreateOpinion/>
            </div>
            
            }
            </>
        )
    }
}

export default MyOpinions;