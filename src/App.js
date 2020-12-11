import './App.css';
import { AuthCont } from './Auth/AuthCont';
import { Main } from './MainContainer/Main';

function App() {

  return (
    <div className="App">
      <Main/>
      <hr></hr>
      <AuthCont/>
    </div>
  );
}

export default App;
