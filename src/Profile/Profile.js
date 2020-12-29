import React, { Component } from 'react'
// import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MyOpinions from './MyOpinions'
import profile from '../default-profile.png'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { AiFillDelete } from "react-icons/ai";
import { unfollowCategory } from '../Redux/action'


// const Profile = (props) => {
//     console.log(props)
//     const [open, setOpen] = React.useState(false)
//     // const myOpinionProps = () =>{
//     //     // debugger
//     //     return props.opinions.filter(opinion => opinion.user.id === props.currentUser.id)
//     // }

//     // console.log(myOpinionProps())
//     // debugger

//     const renderFollowedCategories = () =>{
//         return props.currentUser.categories.map((category, index) => <p key={index}>{category.name}</p>)
//     }

//     return (
//         <div className="my-opinions">
//             {props.userObj ? 
            
            
//             <img src={props.userObj.avatar ? props.userObj.avatar.url : profile} alt="avatar" className="avatar" />
            
//             : 
//             <img src={props.currentUser.avatar ? props.currentUser.avatar.url : profile} alt="avatar" className="avatar" />
//             }
//             {/* <img src={props.currentUser.avatar ? props.currentUser.avatar.url : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="avatar" className="avatar" /> */}

//             <h2>{props.userObj ? 
//             props.userObj.username
            
//             : props.currentUser.username}</h2>
//             <h1>{props.userObj ? "Opinions:" : "My Opinions:"}</h1>

//             {renderFollowedCategories()}
//             {/* <Modal
            
            
//             >



//             </Modal> */}


//             <MyOpinions opinionsByUser={props.userOpinions} opinionsByMe={props.userObj ? props.userOpinions : props.opinions}/>
//         </div>
//     )
// }



class Profile extends Component {

    state = {
        open: false
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

    renderFollowedCategories = () =>{
        return this.props.currentUser.categories.map((category, index) => {
        return (
            <div key={index} className="categories-followed">
                <p>{category.name}</p>
                <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/>
            </div>

        )
    })
    }
    
    render() {
        console.log(this.props)
        return (
            <div className="my-opinions">
            {this.props.userObj ? 
            
            
            <img src={this.props.userObj.avatar ? this.props.userObj.avatar.url : profile} alt="avatar" className="avatar" />
            
            : 
            <img src={this.props.currentUser.avatar ? this.props.currentUser.avatar.url : profile} alt="avatar" className="avatar" />
            }
            {/* <img src={this.props.currentUser.avatar ? this.props.currentUser.avatar.url : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="avatar" className="avatar" /> */}

            <h2>{this.props.userObj ? 
            this.props.userObj.username
            
            : this.props.currentUser.username}</h2>
            <h1>{this.props.userObj ? "Opinions:" : "My Opinions:"}</h1>

            {/* {this.renderFollowedCategories()} */}
            <Button onClick={()=> this.setState(prevState => ({open: true}))}>
                Following
            </Button>

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
    return {unfollow: (object)=> dispatch(unfollowCategory(object))}
}

  export default connect(msp, mdp)(Profile);
