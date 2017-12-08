import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserInputs from './UserInputs';
import CharImages from './CharImages';
import LifeBars from './LifeBars';
import Blanks from './Blanks';
import StatusScreen from './StatusScreen';
import Highscores from './Highscores';

import Sound from 'react-sound';

import RecordsSound from '../audio/New-challenger-sound.mp3';

class Hangman extends Component {

  render() {
    
    //Only displays game if the user continues.
    let display;

    if (this.props.continueGame === true) {
        display =   <div>
                    <UserInputs
                    // clickGuess={this.props.clickGuess}
                    guessLetter={this.props.guessLetter}
                    checkLetter={this.props.checkLetter}
                    // submittingLetter={this.props.submittingLetter}
                    // gameState={this.props.gameState}
                    />
                    <CharImages 
                    // gameState={this.props.gameState}
                    // resetAnimations={this.props.resetAnimations}
                    />
                    <StatusScreen
                    // gameState={this.props.gameState}
                    />
                    <LifeBars
                    // gameState={this.props.gameState}
                    />
                    <Blanks
                    // gameState={this.props.gameState}
                    />
                    </div>
    }
    else {
        display =   <div>
                        <h1 className="headingfont">Thanks for playing!</h1>
                        <Highscores
                        // pastGames={this.props.gameState.pastGames}
                        />
                        <Sound
                            url={RecordsSound}
                            playStatus={Sound.status.PLAYING}
                        />
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
    }
}

export default connect(mapStateToProps)(Hangman);
