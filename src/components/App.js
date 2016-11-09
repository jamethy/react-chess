import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Board from './Board';
import initialPieces from '../init-pieces';

class App extends Component {

  constructor() {
    super();

    this.killPiece = this.killPiece.bind(this);

    this.state = {
      pieces: initialPieces,
      graveyard: {
        team1: [],
        team2: []
      }
    }
  }

  killPiece(piece) {
    const pieces = {...this.state.pieces};
    const graveyard = {...this.state.graveyard};

    console.log(graveyard);

    Object.keys(pieces['team1']).forEach((k) => {
      if (pieces['team1'][k].id === piece.id) {
        piece.position = null;
        pieces['team1'][k] = piece;
        graveyard['team1'].push(piece);
      }
    });

    Object.keys(pieces['team2']).forEach((k) => {
      if (pieces['team2'][k].id === piece.id) {
        piece.position = null;
        pieces['team2'][k] = piece;
        graveyard['team2'].push(piece);
      }
    });
    
    this.setState({
      pieces,
      graveyard
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board 
          pieces={this.state.pieces} 
          style={{float: 'left'}}
          killPiece={this.killPiece}
          graveyard={this.state.graveyard} />
      </div>
    );
  }
}

export default App;
