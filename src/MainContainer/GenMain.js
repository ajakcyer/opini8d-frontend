import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthCont } from "./Auth/AuthCont";
import { Main } from "./MainContainer/Main";

const GenMain = () => {
  return (
    <div>
      <Main />
      {/* <hr></hr>
      <AuthCont/> */}
    </div>
  );
};

export default GenMain;
