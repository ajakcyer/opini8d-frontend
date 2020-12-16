import React, { Component } from 'react'
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import Profile from "../Profile/Profile";
import { connect } from "react-redux";
import { fetchOpinionsFromApi, logoutAction } from "../Redux/action";


class Main extends Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        return this.props.fetchOpinions(data);
      });
  };


  render() {
    // debugger
    // console.log(this.props)
    return (
    <>
      <h1>Main (logged in) Component Container</h1>
      <NavLink to="/opinions">Explore Opinions</NavLink>
      <br></br>
      <NavLink to="/profile">View Profile</NavLink>
      <br></br>
      <button onClick={()=>{

        this.props.logout()
        this.props.history.push('/login')
        }} className="link-button">Log out</button>

      {this.props.opinions.length === 0 ? <h1>Loading...</h1> :
      
      <Switch>
        <Route path="/profile" render={() => <Profile opinions={this.props.opinions} />} />
        <Route path="/opinions" render={() => <AllOpinions opinions={this.props.opinions} />} />
      </Switch>
      
      }
      {/* <hr></hr>
      <AllOpinions /> */}
    </>
      
    )
  }
}

const mdp = (dispatch) => {
  return { 
    fetchOpinions: (data) => dispatch(fetchOpinionsFromApi(data)),
    logout: ()=> dispatch(logoutAction()) 
  };
};

const msp = (state) => {
  return { opinions: state.opinions };
};

export default withRouter(connect(msp, mdp)(Main));