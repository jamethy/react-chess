import React, { Component } from 'react';
import logo from '../logo.svg';
import Board from './Board';
import initialPieces from '../init-pieces';
import { getAvailableMoves } from '../chess_logic';
import base from '../base';
import black_pawn_image from '../../public/images/pieces/black_pawn.svg';
import white_pawn_image from '../../public/images/pieces/white_pawn.svg';

// css
import '../App.css';

class App extends Component {

  constructor() {
    super();

    this.movePiece = this.movePiece.bind(this);
    this.killPiece = this.killPiece.bind(this);
    this.selectPiece = this.selectPiece.bind(this);

    this.state = {
      game : {},
      selectedPiece : null
    };
  }

  componentWillMount() {

    this.ref = base.syncState(`${this.props.params.gameId}/game`, { 
      context: this,
      state: 'game',
      then() {
        if (this.state.game.pieces == null) {
          this.setState({
            game: {
              turn: "white",
              pieces: initialPieces,
              graveyard: {
                team1: [],
                team2: []
              }
            }
          });
        }
      }
    });

    const localStorageRef = localStorage.getItem(`game-${this.props.params.gameId}`);
    if (localStorageRef) {
        this.setState({
            selectedPiece: JSON.parse(localStorageRef)
        });
    }
  }

  componentWillUnmount() {
      base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
      localStorage.setItem(`game-${this.props.params.gameId}`, JSON.stringify(nextState.selectedPiece));
  }

  movePiece(piece, position) {

    const pieces = {...this.state.game.pieces};
    const graveyard = {...this.state.game.graveyard};
    let turn = this.state.game.turn;
    
    if (this.state.game.turn === "white") {
      let moved = false;
      Object.keys(pieces['team1']).forEach((k) => {
        if (pieces['team1'][k].id === piece.id) {
          piece.position = position;
          pieces['team1'][k] = piece
          moved = true;
        }
      });
      if (moved) {
        turn = "black";
        Object.keys(pieces['team2']).forEach((i) => {
          if (pieces['team2'][i].position === position) {
            this.killPiece(pieces['team2'][i]);
          }
        });
      }
    }

    if (this.state.game.turn === "black") {
      let moved = false;
      Object.keys(pieces['team2']).forEach((k) => {
        if (pieces['team2'][k].id === piece.id) {
          piece.position = position;
          pieces['team2'][k] = piece;
          moved = true;
        }
      });
      if (moved) {
        turn = "white";
        Object.keys(pieces['team1']).forEach((i) => {
          if (pieces['team1'][i].position === position) {
            this.killPiece(pieces['team1'][i]);
          }
        });
      }
    }

    this.setState({
      game : {
        turn: turn,
        pieces : pieces,
        graveyard : graveyard
      },
      selectedPiece: null,
    });
  }

  killPiece(piece) {
    const pieces = {...this.state.game.pieces};
    const graveyard = {...this.state.game.graveyard};

    Object.keys(pieces['team1']).forEach((k) => {
      if (pieces['team1'][k].id === piece.id) {
        piece.position = null;
        pieces['team1'][k] = piece;
        if (graveyard['team1'] == null) {
          graveyard['team1'] = [];
        }
        graveyard['team1'].push(piece);
      }
    });

    Object.keys(pieces['team2']).forEach((k) => {
      if (pieces['team2'][k].id === piece.id) {
        piece.position = null;
        pieces['team2'][k] = piece;
        if (graveyard['team2'] == null) {
          graveyard['team2'] = [];
        }
        graveyard['team2'].push(piece);
      }
    });
    
    this.setState({
      game : {
        turn: this.state.game.turn,
        pieces,
        graveyard : graveyard
      }
    });
  }

  selectPiece(piece) {
    const team1 = this.state.game.pieces['team1'];
    const team2 = this.state.game.pieces['team2'];

    let isWhite = false;
    Object.keys(team1).forEach((k) => {
      if (team1[k].id === piece.id) {
        isWhite = true;
      }
    });

    piece.availableMoves = getAvailableMoves(team1, team2, piece, isWhite);

    // override the selected piece
    this.setState({
      selectedPiece : piece
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
          pieces={this.state.game.pieces} 
          graveyard={this.state.game.graveyard}
          style={{float: 'left'}}
          selectPiece={this.selectPiece}
          movePiece={this.movePiece}
          selectedPiece={this.state.selectedPiece} />
        <div className="current-move">
          <img style={{width: 200}} src={this.state.game.turn === 'black' ? black_pawn_image : white_pawn_image} alt="current-move" />
        </div>
      </div>
    );
  }
}

export default App;
