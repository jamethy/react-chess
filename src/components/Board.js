import React, { Component } from 'react';
import Square from './Square';
import Piece from './Piece';

class Board extends Component {

  renderGraveyard(p) {
    return <Piece key={p.id} piece={p}></Piece>
  }

  getPiece(pieces, i, j) {
      let pos = ["A","B","C","D","E","F","G","H"][i] + (j+1);

      for (let piece in pieces) {
        if (piece != null) {
          let p = pieces[piece]
          if (p.position != null && p.position.toUpperCase() === pos) {
              return p;
          }
        }
      }
      return null;
  }

	render() {
		
		const { pieces, graveyard } = this.props;

		const rows = [];
    for (var j = 7; j >= 0; j--) {
			const cols = [];
      for (var i = 0; i <= 7; ++i) {
				const row = j;
				const col = i;
        const piece1 = this.getPiece(pieces.team1,i,j);
        const piece2 = this.getPiece(pieces.team2,i,j);
        const piece = piece1 == null ? piece2 : piece1;
        const hasAvailableMoves = piece != null; // replace with real logic
                
				cols.push(<Square key={j+i} row={row} col={col} piece={piece} hasAvailableMoves={hasAvailableMoves} movePiece={this.props.movePiece} selectedPiece={this.props.selectedPiece} selectPiece={this.props.selectPiece}></Square>);
			}
			rows.push(cols);
		}

    const graveyard1 = graveyard['team1'].map(this.renderGraveyard);
    const graveyard2 = graveyard['team2'].map(this.renderGraveyard);
		return (
      <div className="board-container">
        <div className="graveyard team1">
          {graveyard1}
        </div>
        <div className="board" style={{width: 400, height: 400}}>
          {rows}
        </div>
        <div ref="graveyard-team-1" className="graveyard team2">
          {graveyard2}
        </div>
      </div>
		);
	}
}

export default Board;
