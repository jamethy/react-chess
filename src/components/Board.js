import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
	render() {

		// TODO: convert the array to an 8x8 grid

		return (
			<div style={{width: 500, height: 500}}>
				{[...Array(64)].fill(undefined).map((val, indx) => {
					return <Square key={indx} index={indx}></Square>
				})}
			</div>
		);
	}
}

export default Board;
