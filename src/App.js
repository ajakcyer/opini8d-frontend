import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import { AuthCont } from "./Auth/AuthCont";
// import { Main } from "./MainContainer/Main";
import GenMain from "./MainContainer/GenMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GenMain />
      </BrowserRouter>
    </div>
  );
}

export default App;

