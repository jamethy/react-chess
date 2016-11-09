import React, { Component } from 'react';

class Piece extends Component {

  constructor() {
    super();

    console.log(this.props);
  }

	render() {
    const { piece } = this.props;
		return (
      <img src={piece.image} onClick={() => this.props.killPiece(piece)} role="presentation" />
		);
	}
}

export default Piece;
