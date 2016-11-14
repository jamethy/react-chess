import React, { Component } from 'react';

class Piece extends Component {

	render() {
    const { piece } = this.props;
		return (
      <img src={piece.image} onClick={() => this.props.selectPiece(piece)} role="presentation" />
		);
	}
}

Piece.propTypes = {
  selectPiece: React.PropTypes.func.isRequired
}

export default Piece;
