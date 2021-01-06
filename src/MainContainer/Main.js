import React, { Component, createRef } from 'react'
import { Link, NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import Profile from "../Profile/Profile";
import { connect } from "react-redux";
import { fetchCategories, fetchOpinionsFromApi, logoutAction } from "../Redux/action";
import logo from '../opini8d-logo.png'
import Followed from '../ExplorePage/Followed';
import { Menu, Ref, Sticky, Rail, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider';
import ConversationsCables from '../Messages/ConversationsCables';

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
    // return this.props.currentUser.opinions
  }

  renderUserOpinions = (id) =>{
    // return this.props.opinions.map((opinion, index) => )
    if (this.props.opinions.length > 0){
      return this.props.opinions.filter(opinion => opinion.user.id === id)
    }
  }

  handleReceivedConversation = (response)=>{
    const {conversation} = response
    // debugger
    if (conversation.user_conversations.map( uc => uc.user.id).includes(this.props.currentUser.id)){
        // debugger
        this.props.appendNewConvo(conversation)
    }
}


  render() {
    // debugger
    console.log(this.props)
    return (
      <div className="super-main-content">
      <Ref innerRef={this.contextRef}>
    <div className="all-content">
      {/* <h1>Main (logged in) Component Container</h1> */}
      {/* <img className="logo" src={logo} alt="logo" /> */}
      {/* <br></br> */}
        {/* <Rail position="left"> */}
      <div className="navbar">
      {/* <Sticky context={this.contextRef}> */}

      
      <Menu style={{'paddingLeft': '10%'}} borderless secondary vertical >
      <img className="logo" src={logo} alt="logo" />
        {/* <NavLink className="item" to="/explore/home"> */}
          <Menu.Item
            // className={false}
            // as="p"
            as={ Link }
            to='/explore/home'
            name="Home"
            active={this.state.activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
        {/* </NavLink> */}

        {/* <NavLink to="/explore/profile"> */}
          <Menu.Item
            // as="p"
            as={ Link }
            to="/explore/profile"
            name="Profile"
            active={this.state.activeItem === 'Profile'}
            onClick={this.handleItemClick}
          />
        {/* </NavLink> */}

        {/* <NavLink to="/explore/opinions"> */}
          <Menu.Item
            // as="p"
            as={ Link }
            to="/explore/opinions"
            name="Explore"
            active={this.state.activeItem === 'Explore'}
            onClick={this.handleItemClick}
          />
        {/* </NavLink> */}

        {/* <NavLink to="/explore/messages"> */}
          <Menu.Item
            // as="p"
            as={ Link }
            to="/explore/messages"
            name="Messages"
            active={this.state.activeItem === 'Messages'}
            onClick={this.handleItemClick}
          />
        {/* </NavLink> */}

        <Menu.Item
          // style={{margin: '0 .35714286em .35714286em'}}
          name="Log Out"
          active={this.state.activeItem === 'Log Out'}
          onClick={(e, {name})=>{
            this.handleItemClick(e, name)
            this.props.logout()
            localStorage.removeItem("token")
            document.cookie = 'X-Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
            this.props.history.push('/auth/login')
            }}
        />

      </Menu>
      {/* </Sticky> */}
      </div>
      {/* </Rail> */}
      

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
      {/* <h1>Main (logged in) Component Container</h1> */}

      
      {/* {this.props.opinions.length === 0 ? <h1>Loading...</h1> : */}
      
      {this.props.currentUser ? 
        <>
        <ActionCableConsumer 
                    channel={{channel: 'ConversationsChannel'}}
                    onReceived={(response)=> this.handleReceivedConversation(response)}
        />
                
        <Switch>
          <Route
            path="/explore/users/:id" exact
            render={({ match }) => {
              const lookingForUser = () =>{
                let urlId = parseInt(match.params.id);
                let foundUser = this.props.opinions.find(
                  (opinion) => opinion.user.id === urlId
                ).user;
                return foundUser
              }
                // debugger
                
              return (
              <>
              <div className="title">
                  <h1>Opinions:</h1>
                </div>
                {this.props.opinions.length > 0 ?
              <Profile userObj={lookingForUser()} userOpinions={this.renderUserOpinions(lookingForUser().id)} />
                
              :
              
              
              <Loader style={{'marginLeft': '8%'}} active size='massive'>Loading</Loader>
              }
              </>
              
              )
            }}
          />
          <Route path="/explore/profile" render={() => {
            return (
              <>
                <div className="title">
                  <h1>My Opinions:</h1>
                </div>
                  {this.props.opinions.length > 0 ?
                  <Profile opinions={this.getMyOpinions()} />
                  
                  :
                  
                  <Loader style={{'marginLeft': '8%'}} active size='massive'>Loading</Loader>

                  }
              </>
            )
          }} />
          

          <Route path="/explore/opinions" render={() => {
            return (
              <>
                <div className="title">

                  <h1>Explore Opinions</h1>
                </div>
                <AllOpinions /* categories={this.props.categories.length > 0 ? this.props.categories : null} opinions={this.props.opinions.length > 0 ? this.props.opinions : null} */ />
              </>
            )
          
          }} />
          <Route path="/explore/home" render={() => <Followed/>} />
          <Route path="/explore/messages" render={()=> <ConversationsCables/>}/>
        </Switch>

        </>
        
        : null

      }
      </div>

    </div>
    </Ref>
    </div>
    )
  }
}

const mdp = (dispatch) => {
  return { 
    fetchOpinions: (data) => dispatch(fetchOpinionsFromApi(data)),
    logout: ()=> dispatch(logoutAction()),
    fetchCategories: () => dispatch(fetchCategories()),
    appendNewConvo: (conversation)=> dispatch({type: "ADD_CONVO", payload: conversation})
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