import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unfollowCategory } from '../Redux/action'
import {OpinionCard} from '../ReuseComponents/OpinionCard'
import { AiFillDelete } from "react-icons/ai";

class Followed extends Component {

    
    userCategories = () =>{
        let categoryArray = []
        this.props.userCat.forEach(category => {
            categoryArray.push(category.name)
        });
        // debugger
        return categoryArray
    }
    
    categoryIncluded = (category) =>{
        let opinionArray = []
        let opinionCategories = this.props.opinions.forEach(opinion => {
            opinion.categories.forEach(opCategory => {
                if (opCategory.name === category){
                    opinionArray.push(opinion)
                    // if (opinionArray[category]){
                    //     opinionArray[category].push(opinion)
                    // } else {
                    //     opinionArray[category] = [opinion]
                    // }
                }
                // return opCategory.name === category
            })
        })
        return opinionArray
        // debugger
    }

    renderOpinions = (opinions) =>{
        return opinions.map((opinion, index) => <OpinionCard key={index} opinion={opinion} />)
    }

    onClickUnfollow = (category) =>{
        let thisCat = this.props.currentUser.categories.find(c => c.name === category)
        let ucID = this.props.currentUser.user_categories.find(uc => uc.category_id === thisCat.id)
        this.props.unfollow(ucID)
        // debugger
      }

    filterOpinions = () =>{
        return this.userCategories().map((category, index) => {
            let result = this.categoryIncluded(category)
            // debugger
            return (
                <div className="category-name" key={index}>
                    <h3>{category}
                    <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/></h3>
                    {result.length > 0 ? this.renderOpinions(result) : <p>No opinions yet...</p>}
                </div>
            )
            // debugger
        })
    }



    render() {
        // console.log("User followed categories: ", this.props.userCat)
        // console.log("All Opinions: ", this.props.opinions)
        console.log(this.props)
        return (
            <div>
                <h2>Homepage for followed categories</h2>
                {/* {this.renderOpinions()} */}
                {this.filterOpinions()}
            </div>
        )
    }
}

const mdp = (dispatch) =>{
    return {unfollow: (object)=> dispatch(unfollowCategory(object))}
}

const msp = (state) =>{
    return {userCat: state.currentUser.categories,
            opinions: state.opinions,
            currentUser: state.currentUser}
}

export default connect(msp, mdp)(Followed)