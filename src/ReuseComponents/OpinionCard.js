import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

export const OpinionCard = ({ opinion }) => {
  return (
    <div>
      {/* <h4>By: {opinion.user.username}</h4> */}
      <NavLink to={`/opinions/${opinion.id}`}>
        <h3>{opinion.title}</h3>
      </NavLink>
      <hr></hr>
    </div>
  );
};
