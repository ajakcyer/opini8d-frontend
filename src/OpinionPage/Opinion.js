import React, { Component } from "react";
import { connect } from "react-redux";
import { editOpinion, deleteOpinion, opinionRated, patchRating, deleteRating } from "../Redux/action";
import { NavLink, withRouter } from "react-router-dom";
import { Button, Progress } from 'semantic-ui-react'
import profile from '../default-profile.png'
import { CgClose } from "react-icons/cg";
import { RiImageAddFill } from "react-icons/ri";

class Opinion extends Component {
  state = {
    editBtn: false,
    title: this.props.opinion.title,
    content: this.props.opinion.content,
    imgClosed: false,
    otherImage: null
  };

  onClickHandler = (e) => {
    // debugger
    switch (e.target.innerHTML) {
      case "Disagree":
        if (this.didIVote()){
          if (this.didIVote().agreeable === false){
            return this.props.deleteRate({
              id: this.didIVote().id,
              opinionId: this.props.opinion.id
            })
            // debugger
          } else {
            return this.props.patchRating({
              id: this.didIVote().id,
              agreeable: false
            })
          }
        } else {
          return this.props.ratePost({
            userId: this.props.currentUser.id,
            id: this.props.opinion.id,
            agreeable: false,
          });

        }
      case "Agree":
        if (this.didIVote()){
          if (this.didIVote().agreeable === true){
            return this.props.deleteRate({
              id: this.didIVote().id,
              opinionId: this.props.opinion.id
            })
          } else {
            return this.props.patchRating({
              id: this.didIVote().id,
              agreeable: true
            })
          }
        } else {
          return this.props.ratePost({
            userId: this.props.currentUser.id,
            id: this.props.opinion.id,
            agreeable: true,
          });
        }
    }
  };

  editClicked = (e) => {
    // debugger
    if (e.target.innerText === "Edit Post"){
      this.setState((prev) => ({ editBtn: true }));
    } else if (e.target.innerText === "Nevermind"){
      this.setState((prev) => ({ 
        editBtn: false,
        imgClosed: false,
        otherImage: null
      }));
    }
  };

  onChangeUpdate = (e) => {
    this.setState((prev) => ({
      [e.target.name]: e.target.value,
    }));
  };

  updatePost = (e) => {
    e.preventDefault();
    // debugger
    if (this.state.imgClosed === true && this.state.otherImage === null){
      // alert('delete image only')
      this.props.editPost({
        id: this.props.opinion.id,
        title: this.state.title,
        content: this.state.content,
        delete: true,
        // otherImage: false
      });
    } else if (this.state.imgClosed === true && this.state.otherImage ){
      // alert('delete image and new picture')
      this.props.editPost({
        id: this.props.opinion.id,
        title: this.state.title,
        content: this.state.content,
        delete: true,
        otherImage: this.state.otherImage
    })
    } else if (this.state.imgClosed === false && this.state.otherImage){
        this.props.editPost({
          id: this.props.opinion.id,
          title: this.state.title,
          content: this.state.content,
          // delete: true,
          otherImage: this.state.otherImage
        })
    } else {
      // alert('no change to image')
      this.props.editPost({
        id: this.props.opinion.id,
        title: this.state.title,
        content: this.state.content,
        // delete: false,
        // otherImage: false
      });

    }
    this.setState((prev) => ({ 
      editBtn: false,
      imgClosed: false,
      otherImage: null
    }));
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
          {/* <h5>
            {(positive.length / this.props.opinion.ratings.length) * 100}% Agree
          </h5> */}
          <Progress color="green" percent={((positive.length / this.props.opinion.ratings.length) * 100).toFixed(2)} progress label="Agree" />
          {/* <h5>
            {(negative.length / this.props.opinion.ratings.length) * 100}%
            disagree
          </h5> */}
          <Progress color="red" percent={((negative.length / this.props.opinion.ratings.length) * 100).toFixed(2)} progress label="Disagree" />
          <p>
            Out of {this.props.opinion.ratings.length}{" "}
            {this.props.opinion.ratings.length > 1 ? "votes" : "vote"}
          </p>
        </>
      );
    } else {
      return (
        <>
          <Progress color="green" percent={0} progress label="Agree" />
          <Progress color="red" percent={0} progress label="Disagree" />
          <p>No ratings yet!</p>
        </>
      );
    }
  };

  didIVote = () =>{
    // debugger
    let myVote = this.props.opinion.ratings.find(rating => rating.user_id === this.props.currentUser.id)
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

  renderCategories = () =>{
    return this.props.opinion.categories.map((category, index) => <p key={index}>#{category.name}</p>)
  }

  imageChangeHandler = (e) =>{
    // debugger
    this.setState(prev=>({
        otherImage: e.target.files[0]
    }))
  }

  render() {
    // console.log("My Vote: ", this.didIVote(), "Props: ", this.props);
    // console.log("Opinion User ID: ", this.props.opinion.user.id)
    console.log(this.props)
    return (
      <div>
        {this.ratings()}
        <h4> 
          
        {/* {this.props.currentUser.username === this.props.opinion.user.username ? 
            
            
            <img src={this.props.opinion.user.avatar ? this.props.opinion.user.avatar.url : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="avatar" className="avatar" />
            
            : 
            <img src={props.currentUser.avatar ? props.currentUser.avatar.url : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="avatar" className="avatar" />
        } */}
          
          <img src={this.props.opinion.user.avatar ? this.props.opinion.user.avatar.url : profile} alt="avatar" className="avatar" />



        By: {this.props.currentUser.username === this.props.opinion.user.username ? this.props.opinion.user.username : 
        <NavLink to={`/explore/users/${this.props.opinion.user.id}`}>
        {this.props.opinion.user.username} 
        </NavLink>

        }</h4>
        {this.props.currentUser.id === this.props.opinion.user.id ? (
          <>
            <button onClick={(e)=>this.editClicked(e)}>
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
            <div className="img_wrap">
              {this.state.imgClosed ? 
              <>
                <label style={this.state.otherImage ? {color: "purple"} : {color: "black"}} className="label-image" htmlFor="opinion-photo"> <RiImageAddFill/></label>
                <input id="opinion-photo" onChange={this.imageChangeHandler} type="file" accept="image/*" style={{display: "none"}}/>
              </>
              
              : 
              
              <>
                {this.props.opinion.other_image ? 
                <>
                  <img style={this.state.imgClosed ? {display: "none"} : {display: "visible"}} className="opinion-image" src={this.props.opinion.other_image.url} alt="opinion-image" />
                  <CgClose onClick={()=> this.setState(prev=>({imgClosed: true}))} className="close"/>
                </>
                :
                
                <>
                  <label style={this.state.otherImage ? {color: "purple"} : {color: "black"}} className="label-image" htmlFor="opinion-photo"> <RiImageAddFill/></label>
                  <input id="opinion-photo" onChange={this.imageChangeHandler} type="file" accept="image/*" style={{display: "none"}}/>
                </>
                
                }
                {/* <img style={this.state.imgClosed ? {display: "none"} : {display: "visible"}} className="opinion-image" src={this.props.opinion.other_image.url} alt="opinion-image" />
                <CgClose onClick={()=> this.setState(prev=>({imgClosed: true}))} className="close"/> */}
              </>
              }
            </div>

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
            <div>

            {this.renderCategories()}
            <h2>{this.props.opinion.title}</h2>
            {this.props.opinion.other_image ? <img className="opinion-image" src={this.props.opinion.other_image.url} alt="opinion-image" /> : null}
            <br></br><br></br>
            <p>{this.props.opinion.content}</p>
            </div>

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
    patchRating: (rating) => dispatch(patchRating(rating)),
    deleteRate: (rating) => dispatch(deleteRating(rating))
  };
};

export default withRouter(connect(msp, mdp)(Opinion));
