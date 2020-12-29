import React, { Component } from 'react'
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import Profile from "../Profile/Profile";
import { connect } from "react-redux";
import { fetchCategories, fetchOpinionsFromApi, logoutAction } from "../Redux/action";
import logo from '../opini8d-logo.png'
import Followed from '../ExplorePage/Followed';


class Main extends Component {
  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        return this.props.fetchOpinions(data);
      });
    this.props.fetchCategories()
  };

  getMyOpinions = () =>{
    if (this.props.opinions.length > 0){
      return this.props.opinions.filter(opinion => opinion.user.id === this.props.currentUser.id)
    }
  }

  renderUserOpinions = (id) =>{
    // return this.props.opinions.map((opinion, index) => )
    if (this.props.opinions.length > 0){
      return this.props.opinions.filter(opinion => opinion.user.id === id)
    }
  }


  render() {
    // debugger
    console.log(this.props)
    return (
    <>
      <h1>Main (logged in) Component Container</h1>
      <img className="logo" src={logo} alt="logo" />
      <br></br>
      <NavLink to="/explore/opinions">Explore Opinions</NavLink>
      <br></br>
      <NavLink to="/explore/profile">View Profile</NavLink>
      <br></br>
      <NavLink to="/explore/home">Home</NavLink>
      <br></br>
      <button onClick={()=>{

        this.props.logout()
        localStorage.removeItem("token")
        this.props.history.push('/auth/login')
        }} className="link-button">Log out</button>

      {this.props.opinions.length === 0 ? <h1>Loading...</h1> :
      
      this.props.currentUser ? 
        
        <Switch>
          <Route
            path="/explore/users/:id" exact
            render={({ match }) => {
              let urlId = parseInt(match.params.id);
              let foundUser = this.props.opinions.find(
                (opinion) => opinion.user.id === urlId
              ).user;
                // debugger
                
              return <Profile userObj={foundUser} userOpinions={this.renderUserOpinions(foundUser.id)} />;
            }}
          />
          <Route path="/explore/profile" render={() => <Profile opinions={this.getMyOpinions()} />} />
          <Route path="/explore/opinions" render={() => <AllOpinions categories={this.props.categories.length > 0 ? this.props.categories : null} opinions={this.props.opinions.length > 0 ? this.props.opinions : null} />} />
          <Route path="/explore/home" render={() => <Followed/>} />
        </Switch>
        
        : null

      }

    </>
      
    )
  }
}

const mdp = (dispatch) => {
  return { 
    fetchOpinions: (data) => dispatch(fetchOpinionsFromApi(data)),
    logout: ()=> dispatch(logoutAction()),
    fetchCategories: () => dispatch(fetchCategories())
  };
};

const msp = (state) => {
  return {
    opinions: state.opinions,
    currentUser: state.currentUser,
    categories: state.categories
  };
};

export default withRouter(connect(msp, mdp)(Main));