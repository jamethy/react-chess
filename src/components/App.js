import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Board from './Board';
import initialPieces from '../init-pieces';

class App extends Component {

  constructor() {
      super();

      this.state = {
        pieces: initialPieces
      }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board pieces={this.state.pieces} style={{float: 'left'}}/>
      </div>
    );
  }
}

export default App;
