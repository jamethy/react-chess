import React, { Component } from 'react';
import Square from './Square';
import Piece from './Piece';

class Board extends Component {

  constructor() {
    super();

    this.addToGraveYard = this.addToGraveYard.bind(this);

    this.state = {
      team1Graveyard: [],
      team2Graveyard: []
    }
  }

  addToGraveYard(piece, indx) {
    console.log({piece, indx})
    // if (indx === 1) {
    //   const team1Graveyard = [...this.state.team1Graveyard];
    //   team1Graveyard.push(<Piece piece={piece}></Piece>);
    //   this.setState(team1Graveyard);
    // } else if (indx === 2) {
    //   const team2Graveyard = [...this.state.team2Graveyard];
    //   team2Graveyard.push(<Piece piece={piece}></Piece>);
    //   this.setState(team2Graveyard);
    // }
  }

  getPiece(pieces, i, j) {
      var pos = ["A","B","C","D","E","F","G","H"][i] + (j+1);

      for (var piece in pieces.team1) {
          const p = pieces.team1[piece];
          if (p.position != null && p.position.toUpperCase() === pos) {
              return p;
          } else {
            this.addToGraveYard(p, 1);
          }
      }

      for (var piece in pieces.team2) {
          const p = pieces.team2[piece];
          if (p.position != null && p.position.toUpperCase() === pos) {
              return p;
          } else {
            this.addToGraveYard(p, 2);
          }
      }
      return {};
  }

	render() {
		
		const { pieces } = this.props;

		const rows = [];
		for (var j = 0; j < 8; j++) {
			const cols = [];
			for (var i = 0; i < 8; i++) {
				const row = j;
				const col = i;
				cols.push(<Square key={j+i} row={row} col={col} piece={this.getPiece(pieces, i, j)}></Square>);
			}
			rows.push(cols);
		}

		return (
      <div className="board-container">
        <div className="graveyard team1">
          {this.state.team1Graveyard}
        </div>
        <div className="board" style={{width: 400, height: 400}}>
          {rows}
        </div>
        <div className="graveyard team2">
          {this.state.team2Graveyard}
        </div>
      </div>
		);
	}
}

export default Board;
