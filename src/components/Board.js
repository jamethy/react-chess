import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

  getPiece(pieces, i, j) {
      var pos = ["A","B","C","D","E","F","G","H"][i] + (j+1);

      for (var piece in pieces) {
          var p = pieces[piece]
          if (p.position != null && p.position.toUpperCase() === pos) {
              return p;
          }
      }
      return null;
  }

	render() {
		
		const { pieces } = this.props;

		const rows = [];
        for (var j = 7; j >= 0; j--) {
			const cols = [];
            for (var i = 7; i >= 0; i--) {
				const row = j;
				const col = i;
                const piece1 = this.getPiece(pieces.team1,i,j);
                const piece2 = this.getPiece(pieces.team2,i,j);
                const piece = piece1 === null ? piece2 : piece1;
                const hasAvailableMoves = piece != null; // replace with real logic
                
				cols.push(<Square key={j+i} row={row} col={col} piece={piece} hasAvailableMoves={hasAvailableMoves}></Square>);
			}
			rows.push(cols);
		}

		return (
      <div className="board-container">
        <div className="graveyard team1"></div>
        <div className="board" style={{width: 400, height: 400}}>
          {rows}
        </div>
        <div className="graveyard team2"></div>
      </div>
		);
	}
}

export default Board;
