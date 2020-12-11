import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import { Profile } from "../Profile/Profile";

export const Main = () => {
  return (
    <>
      <h1>Main (logged in) Component Container</h1>
      <Switch>
        <Route path="/profile" render={() => <Profile />} />
        
      </Switch>
      <hr></hr>
      <AllOpinions />
    </>
  );
};
