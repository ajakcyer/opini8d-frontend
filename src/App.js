import './App.css';

function App() {

  fetch("http://localhost:3000/api/v1/opinions")
  .then(r=>r.json())
  .then(console.log)

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
