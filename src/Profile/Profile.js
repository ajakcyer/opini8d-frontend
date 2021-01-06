import React, { Component } from 'react'
// import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MyOpinions from './MyOpinions'
import profile from '../default-profile.png'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { AiFillDelete, AiFillMail } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { followCategory, unfollowCategory } from '../Redux/action'
import StartChatButton from '../Messages/StartChatButton'


class Profile extends Component {

    state = {
        open: false,
        following: false
    }
    
    onClickUnfollow = (category) =>{
        let ucID = this.props.currentUser.user_categories.find(uc => uc.category_id === category.id)
        // let object = {
        //     user_id: this.props.currentUser.id,
        //     category_id: category.id
        // }
        this.props.unfollow(ucID)
        // debugger
    }

    onClickFollowCat = (category) =>{
        // debugger
        let object = {
          user: this.props.currentUser,
          category: category
        }
        // debugger
        // alert(category)
        this.props.followCategory(object)
    }

    doesUserFollow = (category) =>{
        let result = this.props.currentUser.categories.some(cat => cat.name === category );

        // debugger
        // if (result){
        //     this.setState(prevState=>({following: true}))
        // } else {
        //     this.setState(prevState=>({following: false}))
        // }
        return result

    }

    renderFollowedCategories = () =>{
        if (this.props.userObj){

            return this.props.userObj.categories.map((category, index) => {
                return (
                    <div key={index} className="categories-followed">
                        <p>{category.name}</p>
                        {this.doesUserFollow(category.name) ?
                            <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/>
                        :
                            <IoAddCircle onClick={()=> this.onClickFollowCat(category.name)}/>
                        }
                        {/* {this.doesUserFollow(category.name)} */}
                        {/* {this.doesUserFollow(category.name) ? <p>YES</p> : <p>NO</p>} */}
                        {/* <IoAddCircle onClick={()=> this.onClickFollowCat(category.name)}/> */}
                    </div>
        
                )
            })
            
        } else {

            return this.props.currentUser.categories.map((category, index) => {
            return (
                <div key={index} className="categories-followed">
                    <p>{category.name}</p>
                    <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/>
                </div>
    
            )
        })

        }
    }
    
    render() {
        console.log(this.props)
        return (
            <div className="my-opinions">
                {/* <div className="title">
                    <h1>{this.props.userObj ? "Opinions:" : "My Opinions:"}</h1>
                </div> */}
                
                <div className="user-pic-info">
                    {this.props.userObj ? 
                    
                    
                    <img src={this.props.userObj.avatar ? this.props.userObj.avatar.url : profile} alt="avatar" className="avatar" />
                    
                    : 
                    <img src={this.props.currentUser.avatar ? this.props.currentUser.avatar.url : profile} alt="avatar" className="avatar" />
                    }

                    {/* <img src={this.props.currentUser.avatar ? this.props.currentUser.avatar.url : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="avatar" className="avatar" /> */}
                    <div className="user-follow-info">
                    {this.props.userObj ? 
                    <>
                        <h2>{this.props.userObj.username}</h2>
                        <StartChatButton user={this.props.userObj}/>
                    </>
                    :           
                    <h2>{this.props.currentUser.username}</h2>
                    }

                    {/* <h1>{this.props.userObj ? "Opinions:" : "My Opinions:"}</h1> */}

                    <Button onClick={()=> this.setState(prevState => ({open: true}))}>
                        {this.props.userObj ? this.props.userObj.categories.length : this.props.currentUser.categories.length} Following
                    </Button>
                    </div>
                </div>

            <Modal
                size="mini"
                open={this.state.open}
                onClose={()=> this.setState(prevState => ({open: false}))}
            >
                <Modal.Header>Followed Categories: </Modal.Header>
                <Modal.Content>
                    {this.renderFollowedCategories()}
                </Modal.Content>


            </Modal>


            <MyOpinions opinionsByUser={this.props.userOpinions} opinionsByMe={this.props.userObj ? this.props.userOpinions : this.props.opinions}/>
        </div>
        )
    }
}


const msp = (state) => {
    return { currentUser: state.currentUser };
  };

const mdp = (dispatch) =>{
    return {unfollow: (object)=> dispatch(unfollowCategory(object)),
        followCategory: (object) => dispatch(followCategory(object))
    }
}

  export default connect(msp, mdp)(Profile);
