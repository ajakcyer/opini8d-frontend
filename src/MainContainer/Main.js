import React, { Component, createRef } from 'react'
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import Profile from "../Profile/Profile";
import { connect } from "react-redux";
import { fetchCategories, fetchOpinionsFromApi, logoutAction } from "../Redux/action";
import logo from '../opini8d-logo.png'
import Followed from '../ExplorePage/Followed';
import { Menu, Ref, Sticky, Rail } from 'semantic-ui-react'

class Main extends Component {

  state = {
    activeItem: 'Home'
  }

  contextRef = createRef()

  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name})
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/api/v1/opinions")
      .then((r) => r.json())
      .then((data) => {
        // debugger
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
      <Ref innerRef={this.contextRef}>
    <div className="all-content">
      {/* <h1>Main (logged in) Component Container</h1> */}
      {/* <img className="logo" src={logo} alt="logo" /> */}
      <br></br>
        <Rail>
      <Sticky context={this.contextRef}>
      <div className="navbar">

      
      <Menu  pointing secondary vertical >
        {/* <Menu.Item header><img className="logo" src={logo} alt="logo" /></Menu.Item> */}
      <img className="logo" src={logo} alt="logo" />
        <NavLink to="/explore/home">
          <Menu.Item
            name="Home"
            active={this.state.activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
        </NavLink>

        <NavLink to="/explore/profile">
          <Menu.Item
            name="Profile"
            active={this.state.activeItem === 'Profile'}
            onClick={this.handleItemClick}
          />
        </NavLink>

        <NavLink to="/explore/opinions">
          <Menu.Item
            name="Explore"
            active={this.state.activeItem === 'Explore'}
            onClick={this.handleItemClick}
          />
        </NavLink>

        <Menu.Item
          name="Log Out"
          active={this.state.activeItem === 'Log Out'}
          onClick={(e, {name})=>{
            this.handleItemClick(e, name)
            this.props.logout()
            localStorage.removeItem("token")
            this.props.history.push('/auth/login')
            }}
        />

      </Menu>
      </div>
      </Sticky>
      </Rail>
      

      {/* <NavLink to="/explore/opinions">Explore Opinions</NavLink>
      <br></br>
      <NavLink to="/explore/profile">View Profile</NavLink>
      <br></br>
      <NavLink to="/explore/home">Home</NavLink>
      <br></br>
      <button onClick={()=>{

        this.props.logout()
        localStorage.removeItem("token")
        this.props.history.push('/auth/login')
        }} className="link-button">Log out</button> */}
      <div className="main-content">
      <h1>Main (logged in) Component Container</h1>

      
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
      </div>

    </div>
    </Ref>
      
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