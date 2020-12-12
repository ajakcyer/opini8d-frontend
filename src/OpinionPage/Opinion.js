import React, { Component } from "react";
import { connect } from "react-redux";

class Opinion extends Component {

  onClickHandler = (e) =>{
    // debugger
    switch(e.target.innerHTML){
      case "Disagree":
        return console.log("Clicked on disagree")
      case "Agree":
        return console.log("Clicked on agree")

    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h4>By: {this.props.opinion.user.username}</h4>
        <h2>{this.props.opinion.title}</h2>
        <p>{this.props.opinion.content}</p>
        <button onClick={this.onClickHandler}>Disagree</button>
        <button onClick={this.onClickHandler}>Agree</button>
      </div>
    );
  }
}

const msp = (state) =>{
  return ({currentUser: state.currentUser})
}

const mdp = (dispatch) =>{
  return({rateUser: ()=> dispatch()})
}

export default connect(msp)(Opinion);
