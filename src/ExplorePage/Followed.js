import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unfollowCategory } from '../Redux/action'
import {OpinionCard} from '../ReuseComponents/OpinionCard'
import { AiFillDelete } from "react-icons/ai";
import { Card, Sticky, Ref, Placeholder, Grid } from 'semantic-ui-react'


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
        return opinions.map((opinion, index) => <Card key={index} style={{ height: '150px'}}><OpinionCard key={index} opinion={opinion} /></Card> )
    }

    // onClickUnfollow = (category) =>{
    //     let thisCat = this.props.currentUser.categories.find(c => c.name === category)
    //     let ucID = this.props.currentUser.user_categories.find(uc => uc.category_id === thisCat.id)
    //     this.props.unfollow(ucID)
    //     // debugger
    //   }

    // filterOpinions = () =>{
    //     return this.userCategories().map((category, index) => {
    //         let result = this.categoryIncluded(category)
    //         debugger
    //         return (
    //             <div className="category-name" key={index}>
    //                 <h3>{category}
    //                 {/* <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/> */}
    //                 </h3>
    //                 {result.length > 0 ? this.renderOpinions(result) : <p>No opinions yet...</p>}
    //             </div>
    //         )
    //         // debugger
    //     })
    // }

    filterAllOpinions = () =>{
        let result = []
        this.userCategories().forEach((category, index) => {
            result = result.concat(this.categoryIncluded(category))
         
        })
        let sortedResult = result.sort((opinionA, opinionB) => {
            let dateA = new Date(opinionA.created_at)
            let dateB = new Date(opinionB.created_at)
            return dateB - dateA
        })

    
        let uniqueSorted = [...new Set(sortedResult)]
        // debugger
        return (
            <div className="followed-opinions">
                {uniqueSorted.length > 0 ?
                <Card.Group style={{'margin': '0'}} centered itemsPerRow={4}>{this.renderOpinions(uniqueSorted)}</Card.Group> 
                
            :
                    <h3>View explore page and follow categories that interest you!</h3>
            }
            </div>
        )
        // sortedResult
    }



    render() {
        // console.log("User followed categories: ", this.props.userCat)
        // console.log("All Opinions: ", this.props.opinions)
        console.log(this.props)
        return (
            <>
            <div className="title">
                <h1>Homepage for followed categories</h1>
            </div>
                {/* {this.renderOpinions()} */}
                {this.filterAllOpinions()}
            </>
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