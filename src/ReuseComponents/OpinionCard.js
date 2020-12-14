import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

export const OpinionCard = ({ opinion }) => {
  console.log(opinion)

  const ratings = () =>{
    // debugger
    let color;
    if (opinion.ratings.length > 0){
      let positive = opinion.ratings.filter(rating => rating.agreeable === true)
      let negative = opinion.ratings.filter(rating => rating.agreeable === false)
      // debugger
      if (positive.length > negative.length){
        return color = "Green"
      } else if (positive.length < negative.length){
        // debugger
        return color = "Red"
      } else if (positive.length === negative.length){
        return color = "Grey"
      }
    } else {
      return color = "Grey"
    }
    
  }
  // console.log(ratings())

  return (
    <div className={ratings()}>
      {/* <h4>By: {opinion.user.username}</h4> */}
      <NavLink to={`/opinions/${opinion.id}`}>
        <h3>{opinion.title}</h3>
      </NavLink>
      <hr></hr>
    </div>
  );
};
