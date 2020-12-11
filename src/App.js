import './App.css';
import { AuthCont } from './Auth/AuthCont';
import { Main } from './MainContainer/Main';

function App() {

  fetch("http://localhost:3000/api/v1/opinions")
  .then(r=>r.json())
  .then(console.log)

  return (
    <div className="App">
      <Main/>
      <hr></hr>
      <AuthCont/>
    </div>
  );
}

export default App;
