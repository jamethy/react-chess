import React, { Component } from 'react';

class Piece extends Component {

  constructor() {
    super();
  }

	render() {

    const { piece } = this.props;

		return (
      <img src={piece.image} role="presentation" />
		);
	}
}

export default Piece;
