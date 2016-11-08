import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import Graveyard from './components/Graveyard';
import black_pawn_image from '../public/images/pieces/black_pawn.svg';

class App extends Component {

    constructor() {
        super();
    }

    state = {
        pieces: {}
    };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board pieces={this.state.pieces}/>
        <Graveyard />
      </div>
    );
  }
}

export default App;
