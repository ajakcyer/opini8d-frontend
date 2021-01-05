import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpinionsFromApi, followCategory, unfollowCategory } from "../Redux/action";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import Opinion from "../OpinionPage/Opinion";
import { OpinionCard } from "../ReuseComponents/OpinionCard";
import CreateOpinion from "../ReuseComponents/CreateOpinion";
import Profile from '../Profile/Profile'
import { IoAddCircle } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Card } from 'semantic-ui-react'

class AllOpinions extends Component {
  // componentDidMount = () => {
  //   fetch("http://localhost:3000/api/v1/opinions")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       return this.props.fetchOpinions(data);
  //     });
  // };

  renderOpinions = () => {
    // debugger
    return this.props.opinions.map((opinion, index) => <OpinionCard key={index} opinion={opinion}/>);
  };

  // renderCatOpinions = (apiCategory) =>{
  //   return this.props.opinions.map((opinion, index) => {
  //     return opinion.categories.map((category, catIndex) => )
  //   })
  // }

  // userCategories = () =>{
  //   let categoryArray = []
  //   this.props.categories.forEach(category => {
  //       categoryArray.push(category.name)
  //   });
  //   // debugger
  //   return categoryArray
  // }

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

  renderCatOpinions = (opinions) =>{
      return opinions.map((opinion, index) => <Card key={index} style={{width: '150px', height: '100px'}}><OpinionCard key={index} opinion={opinion} /></Card>)
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

  onClickUnfollow = (category) =>{
    let thisCat = this.props.currentUser.categories.find(c => c.name === category)
    let ucID = this.props.currentUser.user_categories.find(uc => uc.category_id === thisCat.id)
    this.props.unfollow(ucID)
  }

  filterOpinions = () =>{
    return this.props.categories.map((category, index) => {
        let result = this.categoryIncluded(category)
        return (
            <div key={index} className="category-name">
                <h2>{category}{/*<IoAddCircle onClick={()=> this.onClickFollowCat(category)} /> */}
                {this.doesUserFollow(category) ?
                <AiFillDelete onClick={()=> this.onClickUnfollow(category)}/>
                :
                <IoAddCircle onClick={()=> this.onClickFollowCat(category)} />
                }</h2>
                {result.length > 0 ? <Card.Group style={{'flex-wrap': 'nowrap'}} className="scrolling">{this.renderCatOpinions(result)}</Card.Group> : <Card.Group style={{'flex-wrap': 'nowrap'}} className="scrolling"><Card style={{width: '150px', height: '100px'}}><Card.Header>No opinions yet...</Card.Header></Card></Card.Group>}
            </div>
        )
        // debugger
    })
  }

  // renderUserOpinions = (id) =>{
  //   // return this.props.opinions.map((opinion, index) => )
  //   if (this.props.opinions.length > 0){
  //     return this.props.opinions.filter(opinion => opinion.user.id === id)
  //   }
  // }

  render() {
    console.log(this.props);
    return (
      <>
        {this.props.opinions.length === 0 ?
            <h1>Loading...</h1>
        :
        <Switch>
          {/* <Route
            path="/explore/users/:id" exact
            render={({ match }) => {
              let urlId = parseInt(match.params.id);
              let foundUser = this.props.opinions.find(
                (opinion) => opinion.user.id === urlId
              ).user.id;
                debugger
                
              return <Profile userOpinions={this.renderUserOpinions(foundUser)} />;
            }}
          /> */}
          <Route
            path="/explore/opinions/:id"
            render={({ match }) => {
              let urlId = parseInt(match.params.id);
              let foundOpinion = this.props.opinions.find(
                (opinion) => opinion.id === urlId
              )
                // debugger
              return <Opinion opinion={foundOpinion} />;
            }}
          />
          <Route
            path="/explore/opinions"
            render={() => (
              <>
                <h1 className="title">Explore Opinions</h1>
                <div className="all-opinions">
                    {/* {this.renderOpinions()} */}
                    {this.filterOpinions()}
                </div>
                <CreateOpinion/>
              </>
            )}
          />
        </Switch>
        }
      </>
    );
  }
}

const mdp = (dispatch) => {
  return { unfollow: (object)=> dispatch(unfollowCategory(object)),
          followCategory: (object) => dispatch(followCategory(object))
        };
};

const msp = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(msp, mdp)(AllOpinions);
