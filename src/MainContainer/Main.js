import React, { Component } from 'react'
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import Profile from "../Profile/Profile";
import { connect } from "react-redux";
import { fetchOpinionsFromApi, logoutAction } from "../Redux/action";
import logo from '../opini8d-logo.png'


class Main extends Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        return this.props.fetchOpinions(data);
      });
  };

  getMyOpinions = () =>{
    if (this.props.opinions.length > 0){
      return this.props.opinions.filter(opinion => opinion.user.id === this.props.currentUser.id)
    }
  }


  render() {
    // debugger
    console.log(this.props)
    return (
    <>
      <h1>Main (logged in) Component Container</h1>
      <img className="logo" src={logo} />
      <br></br>
      <NavLink to="/explore/opinions">Explore Opinions</NavLink>
      <br></br>
      <NavLink to="/explore/profile">View Profile</NavLink>
      <br></br>
      <button onClick={()=>{

        this.props.logout()
        this.props.history.push('/auth/login')
        }} className="link-button">Log out</button>

      {this.props.opinions.length === 0 ? <h1>Loading...</h1> :
      
      <Switch>
        <Route path="/explore/profile" render={() => <Profile opinions={this.getMyOpinions()} />} />
        <Route path="/explore/opinions" render={() => <AllOpinions opinions={this.props.opinions} />} />
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
  return {
    opinions: state.opinions,
    currentUser: state.currentUser
  };
};

export default withRouter(connect(msp, mdp)(Main));