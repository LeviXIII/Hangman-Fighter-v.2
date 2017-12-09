import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/style.css';

class Highscores extends Component {
    render() {
        
        //Allows game to run if local storage is empty.
        let noGames = Array.isArray(this.props.pastGames) === false ? 
            [] : this.props.pastGames;
  
        return (
            <div>
                <h1 className="headingfont">Records</h1>
                {noGames.map((value,i) => {
                    return (
                        <div key={i}>
                            <h3 className="headingfont">Game: {i + 1}</h3>
                            <h3 className="headingfont">Decision: {value.decision}</h3>
                            <h3 className="headingfont">List of Guesses: {value.guessList+', '}</h3>
                            <h3 className="headingfont">Amount of Guesses: {value.guessAmount}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      pastGames: state.gameState.pastGames,
    };
  };

export default connect(mapStateToProps)(Highscores);
