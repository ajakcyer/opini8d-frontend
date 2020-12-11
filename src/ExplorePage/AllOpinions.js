import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOpinionsFromApi} from '../Redux/action'

class AllOpinions extends Component {
    
    componentDidMount = () =>{

        fetch("http://localhost:3000/api/v1/opinions")
          .then((r) => r.json())
          .then(data => {
              return this.props.fetchOpinions(data)
          });

    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Explore component for all opinions</h1>
            </div>
        )
    }
}

const mdp = (dispatch) =>{
    return {fetchOpinions: (data) => dispatch(fetchOpinionsFromApi(data))}
}

const msp = (state) =>{
    return {opinions: state.opinions}
}

export default connect(msp, mdp)(AllOpinions);