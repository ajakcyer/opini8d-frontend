import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import AllOpinions from "../ExplorePage/AllOpinions";
import { Profile } from "../Profile/Profile";

export const Main = () => {
  return (
    <>
      <h1>Main (logged in) Component Container</h1>
      <NavLink to="/explore">Explore Opinions</NavLink>
      <br></br>
      <NavLink to="/profile">View Profile</NavLink>
      
      <Switch>
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/explore" render={() => <AllOpinions />} />
      </Switch>
      {/* <hr></hr>
      <AllOpinions /> */}
    </>
  );
};
