import React from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import { AuthCont } from "../Auth/AuthCont"
import { Main } from "./Main"

const GenMain = () => {

    // if user is logged in
    const currentUserID = 2


  return (
    <>
    {currentUserID ? 
    <Main />
    :
    <AuthCont/>
    }
    </>
  );
};

export default GenMain;
