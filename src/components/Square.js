import React, { Component } from 'react';

class Square extends Component {
	render() {
		const color = (this.props.index%2 === 0) ? 'black' : 'white';
		return (
			<div className="color">{color} square</div>
		);
	}
}

export default Square;