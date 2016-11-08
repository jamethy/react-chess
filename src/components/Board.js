import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

    getPiece(pieces, i, j) {
        var pos = ["A","B","C","D","E","F","G","H"][i] + (j+1);

        for (var piece in pieces) {
            const p = pieces[piece];
            if (p.position != null && p.position.toUpperCase() === pos) {
                return p;
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
			<div className="board" style={{width: 400, height: 400}}>
				{rows}
			</div>
		);
	}
}

export default Board;
