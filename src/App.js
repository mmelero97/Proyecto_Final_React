import React from 'react';
import Principal from './containers/Principal/Principal';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Principal />
        </div>
      </BrowserRouter>
    );
  }
}



export default App;
