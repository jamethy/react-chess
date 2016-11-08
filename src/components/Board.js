import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
	render() {

		const rows = [];

		for (var j = 0; j < 8; j++) {
			const cols = [];
			for (var i = 0; i < 8; i++) {
				const row = j;
				const col = i;
				cols.push(<Square key={j+i} row={row} col={col}></Square>);
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
