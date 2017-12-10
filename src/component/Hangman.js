import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

import UserInputs from './UserInputs';
import CharImages from './CharImages';
import LifeBars from './LifeBars';
import Blanks from './Blanks';
import StatusScreen from './StatusScreen';
import Highscores from './Highscores';

import recordsSound from '../audio/New-challenger-sound.mp3';

class Hangman extends Component {

  render() {
    //Only displays game if the user continues.
    let display;

    if (this.props.continueGame === true) {
        display =   <div>
                    <UserInputs guessLetter={this.props.guessLetter} checkLetter={this.props.checkLetter} />
                    <CharImages />
                    <StatusScreen />
                    <LifeBars />
                    <Blanks />
                    </div>
    }
    else {
        display =   <div>
                        <h1 className="headingfont">Thanks for playing!</h1>
                        <Highscores />
                        <ReactAudioPlayer src={recordsSound} autoPlay/>
                    </div>
    }
    return (
        <div>{display}</div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        continueGame: state.gameState.continueGame,
    };
};

export default connect(mapStateToProps)(Hangman);
