import React, { Component } from 'react';
import Piece from './Piece';

class Square extends Component {

	constructor() {
		super();
		this.showPiece = this.showPiece.bind(this);
	}

	showPiece(piece) {
		if (piece) {
			return <Piece killPiece={this.props.killPiece}  piece={piece}></Piece>
		}
	}

	render() {
		
		// pull these off the props
		const { row, col, piece } = this.props;

		const color = ((col+row)%2 === 0) ? 'dark' : 'light';
		return (
			<div className={color + " board-square"}>
				{this.showPiece(piece)}
			</div>
		);
	}
}

export default Square;
