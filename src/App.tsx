import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  function onSubmit() {
    return axios.post('http://localhost:3001/test')
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" />
          <input type="file" />
          <button onClick={onSubmit}>submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
