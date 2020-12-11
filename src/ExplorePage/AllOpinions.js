import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpinionsFromApi } from "../Redux/action";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import { Opinion } from "../OpinionPage/Opinion";
import { OpinionCard } from "../ReuseComponents/OpinionCard";
import CreateOpinion from "../ReuseComponents/CreateOpinion";

class AllOpinions extends Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        return this.props.fetchOpinions(data);
      });
  };

  renderOpinions = () => {
    return this.props.opinions.map((opinion, index) => <OpinionCard key={index} opinion={opinion}/>
    //   return (
    //     <div key={index}>
    //       <h4>By: {opinion.user.username}</h4>
    //       <NavLink to={`/opinions/${opinion.id}`}>
    //         <h3>{opinion.title}</h3>
    //       </NavLink>
    //       <hr></hr>
    //     </div>
    //   );
    );
  };

  render() {
    console.log(this.props);
    return (
      <>
        {this.props.opinions.length === 0 ?
            <h1>Loading...</h1>
        :
        <Switch>
          <Route
            path="/opinions/:id"
            render={({ match }) => {
              let urlId = parseInt(match.params.id);
              let foundOpinion = this.props.opinions.find(
                (opinion) => opinion.id === urlId
              );
                // debugger
              return <Opinion opinion={foundOpinion} />;
            }}
          />
          <Route
            path="/opinions"
            render={() => (
              <>
                <h1 className="title">Explore Opinions</h1>
                <div className="all-opinions">
                    {this.renderOpinions()}
                </div>
                <CreateOpinion/>
              </>
            )}
          />
        </Switch>
        }
      </>
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
