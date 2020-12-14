import React, { Component } from "react";
import { connect } from "react-redux";
import { editOpinion, deleteOpinion } from '../Redux/action'
import {withRouter} from 'react-router-dom'

class Opinion extends Component {
  state = {
    editBtn: false,
    title: this.props.opinion.title,
    content: this.props.opinion.content,
  };

  onClickHandler = (e) => {
    // debugger
    switch (e.target.innerHTML) {
      case "Disagree":
        return console.log("Clicked on disagree");
      case "Agree":
        return console.log("Clicked on agree");
    }
  };

  editClicked = () => {
    this.setState((prev) => ({ editBtn: !prev.editBtn }));
  };

  onChangeUpdate = (e) => {
    this.setState((prev) => ({
      [e.target.name]: e.target.value,
    }));
  };

  updatePost = (e) => {
    e.preventDefault();
    this.props.editPost({
      id: this.props.opinion.id,
      title: this.state.title,
      content: this.state.content
    })
    this.setState((prev) => ({ editBtn: false }));
  };

  deleteBtn = () =>{
    this.props.deletePost(this.props.opinion)
    this.props.history.goBack()
  }


  render() {
    console.log(this.props)
    return (
      <div>
        <h4>By: {this.props.opinion.user.username}</h4>
        {this.props.currentUser === this.props.opinion.user.id ? (
          <>
            <button onClick={this.editClicked}>{this.state.editBtn ? "Nevermind" : "Edit Post"}</button>
            <button onClick={this.deleteBtn}>Delete Post</button>
          </>
        ) : null}

        {this.state.editBtn ? (
          <form onSubmit={this.updatePost}>
            <input
              onChange={this.onChangeUpdate}
              type="text"
              name="title"
              value={this.state.title}
            />
            <br></br>
            <textarea
              onChange={this.onChangeUpdate}
              name="content"
              value={this.state.content}
            ></textarea>
            <br></br>
            <button>Update</button>
          </form>
        ) : (
          <>
            <h2>{this.props.opinion.title}</h2>
            <p>{this.props.opinion.content}</p>
            <button onClick={this.onClickHandler}>Disagree</button>
            <button onClick={this.onClickHandler}>Agree</button>
          </>
        )}
      </div>
    );
  }
}

const msp = (state) => {
  return { currentUser: state.currentUser };
};

const mdp = (dispatch) => {
  return {
    editPost: (opinion) => dispatch(editOpinion(opinion)),
    deletePost: (opinion) => dispatch(deleteOpinion(opinion))
   };
};

export default withRouter(connect(msp, mdp)(Opinion));
