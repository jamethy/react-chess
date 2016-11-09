import React, { Component } from 'react';
import Piece from './Piece';
import { getBoardPosition } from '../chess_logic';

class Square extends Component {

	constructor() {
		super();
		this.showPiece = this.showPiece.bind(this);
	}

	showPiece(piece) {
		if (piece) {
			return <Piece selectPiece={this.props.selectPiece} piece={piece}></Piece>
		}
	}

	render() {
		// pull these off the props
		const { row, col, piece, hasAvailableMoves } = this.props;

		const color = ((col+row)%2 === 0) ? 'dark' : 'light';
    const hasMoves = hasAvailableMoves ? 'moves' : '';

		let highlight = false;
    if (this.props.selectedPiece != undefined) {
    	highlight = this.props.selectedPiece.availableMoves.indexOf(getBoardPosition(col, row)) !== -1;
    }

		return (
			<div className={(highlight ? 'highlight' : '') + " " + color + " " + hasMoves + " board-square"}>
				{this.showPiece(piece)}
			</div>
		);
	}
}

export default Square;
