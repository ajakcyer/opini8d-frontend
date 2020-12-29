import React, { Component } from 'react'
import { connect } from 'react-redux'
import {OpinionCard} from '../ReuseComponents/OpinionCard'

class Followed extends Component {

    // followedOpinionHash = () =>{
    //     let hashMap = {}
    //     let array = this.props.userCat
        
    //     array.forEach(category => {
    //         // debugger
    //         if (hashMap[category.name]) {
                
    //         } else {
    //             return hashMap[category.name] = []
    //         }
    //     });
    //     // debugger
    //     let opinions = this.props.opinions

    //     opinions.forEach(opinion => {

    //         return opinion.categories.forEach(category => {
    //             if (hashMap[category.name]){
    //                 hashMap[category.name].push(opinion)
    //             } else {
    //                 return
    //             }
    //             // return category.name
    //         })
    //     })

    //     // return Object.entries(hashMap).forEach(([key, value]) => {
    //     //     debugger
    //     //     return (
    //     //         <>
    //     //             <h2>{key}</h2>
    //     //         </>
    //     //     )
    //     // })
    //     return hashMap
    // }

    // iterateOpinionArray = (array) =>{
    //     // debugger
    //     return array.map((opinion, index) => <OpinionCard key={index} opinion={opinion}/>)
    // }

    // renderOpinions = () => {
    //     let hash = this.followedOpinionHash()
    //     // debugger
    //     for (const property in hash){
    //         debugger
    //         return (
    //             <>
    //                 <h3>{property}</h3>
    //                 {this.iterateOpinionArray(hash[property])}
    //             </>
    //         )
    //     }
    //     // debugger
    //     // return hash.forEach(([key, value]))
    // }

    
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

    filterOpinions = () =>{
        return this.userCategories().map((category, index) => {
            let result = this.categoryIncluded(category)
            return (
                <div key={index}>
                    <h3>{category}</h3>
                    {result.length > 0 ? this.renderOpinions(result) : <p>No opinions yet...</p>}
                </div>
            )
            // debugger
        })
    }

    render() {
        console.log("User followed categories: ", this.props.userCat)
        console.log("All Opinions: ", this.props.opinions)
        return (
            <div>
                <h2>Homepage for followed categories</h2>
                {/* {this.renderOpinions()} */}
                {this.filterOpinions()}
            </div>
        )
    }
}

const msp = (state) =>{
    return {userCat: state.currentUser.categories,
            opinions: state.opinions}
}

export default connect(msp)(Followed)