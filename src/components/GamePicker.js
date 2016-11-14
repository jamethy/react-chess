// let's go!
import React from 'react';

class GamePicker extends React.Component {

    goToGame(event) {
        event.preventDefault();
        console.log('You changed the URL');
        // first grab the ext from the box
        const gameId = this.gameInput.value;
        // second we're goign to transition from / to /game/:gameId
        this.context.router.transitionTo(`/game/${gameId}`);
    }

    render() {
        return (
            <form className="game-selector" onSubmit={this.goToGame.bind(this)}>
                <h2>Please Enter A Game</h2>
                <input type="text" required placeholder="Game Name" defaultValue="default-game" ref={(input) => { this.gameInput = input}} />
                <button type="submit">Go To Game</button>
            </form>
        )
    }
}

GamePicker.contextTypes = {
    router: React.PropTypes.object
}

export default GamePicker;

