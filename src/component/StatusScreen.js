import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';

import You from '../audio/You-sound.mp3';
import Lose from '../audio/Lose-Sound.mp3';
import Win from '../audio/Win-sound.mp3';
import Perfect from '../audio/Perfect-sound.mp3';

class StatusScreen extends Component {
    render() {
        let currentStatus;
        
        //Checks the status of the game and prints it to the
        //screen.
        if (this.props.gameState.nWrong >= 6) {
            currentStatus = <div>
                                <p>YOU LOSE!</p>
                                <p>The answer is: {this.props.answer}</p>
                                {!this.props.gameState.decisionSound &&
                                <Sound url={You}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}  
                                />}
                                {!this.props.gameState.decisionSound &&
                                <Sound url={Lose}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}    
                                />}
                            </div>;
            
        }
        //If the user gets a perfect game, display the following:
        else if (this.props.gameState.answer.length === this.props.gameState.rightGuesses
        && this.props.gameState.nWrong === 0) {
                currentStatus = <div>
                                    <p>YOU WIN!</p>
                                    <p>PERFECT!</p>
                                    {!this.props.gameState.decisionSound &&
                                    <Sound url={You}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false} 
                                    />}
                                    {!this.props.gameState.decisionSound &&
                                    <Sound url={Win}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false}
                                    />}
                                    {!this.props.gameState.decisionSound &&
                                    <Sound url={Perfect}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false}    
                                    />}
                                </div>;
              
        }
        //If the user wins
        else if (this.props.gameState.answer.length === this.props.gameState.rightGuesses) {
            currentStatus = <div>
                                <p>YOU WIN!</p>
                                {!this.props.gameState.decisionSound &&
                                <Sound url={You}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}
                                />}
                                {!this.props.gameState.decisionSound &&
                                <Sound url={Win}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}
                                />}
                            </div>;
            
        }
        //If the game is to continue.
        else {
            currentStatus = <div>
                                <p>Here are your previous guesses: </p>
                                <div>{this.props.gameState.pastGuesses.join(', ')}</div>
                                <p>You have {this.props.gameState.guessesRemaining - this.props.gameState.nWrong} guesses left.</p>
                            </div>
        }

        return (
            <div className="status">
                {currentStatus}
            </div>
            )
        }
}

const mapStateToProps = (state) => {
    return {
        answer: state.gameState.answer,
    }
}

export default connect(mapStateToProps)(StatusScreen);