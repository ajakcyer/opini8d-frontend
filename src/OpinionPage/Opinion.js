import React, { Component } from "react";
import { connect } from "react-redux";
import { editOpinion, deleteOpinion, opinionRated, patchRating } from "../Redux/action";
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react'

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
        if (this.didIVote()){
          return this.props.patchRating({
            id: this.didIVote().id,
            agreeable: false
          })
        } else {
          return this.props.ratePost({
            userId: this.props.currentUser,
            id: this.props.opinion.id,
            agreeable: false,
          });

        }
      case "Agree":
        if (this.didIVote()){
          return this.props.patchRating({
            id: this.didIVote().id,
            agreeable: true
          })

        } else {
          return this.props.ratePost({
            userId: this.props.currentUser,
            id: this.props.opinion.id,
            agreeable: true,
          });
        }
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
      content: this.state.content,
    });
    this.setState((prev) => ({ editBtn: false }));
  };

  deleteBtn = () => {
    this.props.deletePost(this.props.opinion);
    this.props.history.goBack();
  };

  ratings = () => {
    // debugger
    // let color;
    if (this.props.opinion.ratings.length > 0) {
      let positive = this.props.opinion.ratings.filter(
        (rating) => rating.agreeable === true
      );
      let negative = this.props.opinion.ratings.filter(
        (rating) => rating.agreeable === false
      );
      // debugger
      return (
        <>
          <h5>
            {(positive.length / this.props.opinion.ratings.length) * 100}% Agree
          </h5>
          <h5>
            {(negative.length / this.props.opinion.ratings.length) * 100}%
            disagree
          </h5>
          <p>
            Out of {this.props.opinion.ratings.length}{" "}
            {this.props.opinion.ratings.length > 1 ? "votes" : "vote"}
          </p>
        </>
      );
    } else {
      return (
        <>
          <h5>0% Agree</h5>
          <h5>0% Disagree</h5>
          <p>No ratings yet!</p>
        </>
      );
    }
  };

  didIVote = () =>{
    // debugger
    let myVote = this.props.opinion.ratings.find(rating => rating.user_id === this.props.currentUser)
    return myVote
  }

  iVoted = () =>{
    if (this.didIVote()){
      if (this.didIVote().agreeable){
        return "Agree"
      } else {
        return "Disagree"
      }
    }
  }



  render() {
    console.log("My Vote: ", this.didIVote());
    return (
      <div>
        {this.ratings()}
        <h4>By: {this.props.opinion.user.username}</h4>
        {this.props.currentUser === this.props.opinion.user.id ? (
          <>
            <button onClick={this.editClicked}>
              {this.state.editBtn ? "Nevermind" : "Edit Post"}
            </button>
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

            <Button active={this.iVoted() === "Agree" ? true : false} onClick={this.onClickHandler}>Agree</Button>
            <Button active={this.iVoted() === "Disagree" ? true : false} onClick={this.onClickHandler}>Disagree</Button>
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
    deletePost: (opinion) => dispatch(deleteOpinion(opinion)),
    ratePost: (opinion) => dispatch(opinionRated(opinion)),
    patchRating: (rating) => dispatch(patchRating(rating))
  };
};

export default withRouter(connect(msp, mdp)(Opinion));
