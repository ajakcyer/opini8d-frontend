import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpinionsFromApi } from "../Redux/action";

class AllOpinions extends Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        return this.props.fetchOpinions(data);
      });
  };

  renderOpinions = () => {
    return this.props.opinions.map((opinion, index) => {
      return (
        <div>
          <h4>
            {opinion.user.username}: {opinion.title}
          </h4>
          <p>{opinion.content}</p>
          <button>Disagree</button>
          <button>Agree</button>
        </div>
      );
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className="title">Explore Opinions</h1>
        {this.renderOpinions()}
      </div>
    );
  }
}

const mdp = (dispatch) => {
  return { fetchOpinions: (data) => dispatch(fetchOpinionsFromApi(data)) };
};

const msp = (state) => {
  return { opinions: state.opinions };
};

export default connect(msp, mdp)(AllOpinions);
