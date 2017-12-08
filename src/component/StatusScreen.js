import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import ReactAudioPlayer from 'react-audio-player';

import You from '../audio/You-sound.mp3';
import Lose from '../audio/Lose-Sound.mp3';
import Win from '../audio/Win-sound.mp3';
import Perfect from '../audio/Perfect-sound.mp3';

class StatusScreen extends Component {

    render() {
        let currentStatus;
        let newSound = <ReactAudioPlayer src={Win} autoPlay/>

        //Checks the status of the game and prints it to the
        //screen.
        if (this.props.nWrong >= 6) {
            currentStatus = <div>
                                <p>YOU LOSE!</p>
                                <p>The answer is: {this.props.answer}</p>
                                {!this.props.decisionSound &&
                                <Sound url={You}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}  
                                />}
                                {!this.props.decisionSound &&
                                <Sound url={Lose}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}    
                                />}
                            </div>;
            
        }
        //If the user gets a perfect game, display the following:
        else if (this.props.answer.length === this.props.rightGuesses && this.props.nWrong === 0) {
                currentStatus = <div>
                                    <p>YOU WIN!</p>
                                    <p>PERFECT!</p>
                                    {!this.props.decisionSound &&
                                    <Sound url={You}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false} 
                                    />}
                                    {!this.props.decisionSound &&
                                    <Sound url={Win}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false}
                                    />}
                                    {!this.props.decisionSound &&
                                    <Sound url={Perfect}
                                        playStatus={Sound.status.PLAYING}
                                        loop={false}    
                                    />}
                                </div>;
              
        }
        //If the user wins
        else if (this.props.answer.length === this.props.rightGuesses) {
            currentStatus = <div>
                                <p>YOU WIN!</p>
                                <ReactAudioPlayer src={You} autoPlay onEnded={() => {<ReactAudioPlayer src={Win} autoPlay/>}}/>
                                {/* {!this.props.decisionSound &&
                                <Sound url={You}
                                    playStatus={Sound.status.PLAYING}
                                    onFinishedPlaying={() => {<Sound url={Win} playStatus={Sound.status.PLAYING}/>}}
                                />} */}
                                {/* {!this.props.decisionSound &&
                                <Sound url={Win}
                                    playStatus={Sound.status.PLAYING}
                                    loop={false}
                                />} */}
                                <ReactAudioPlayer src={Win} autoPlay onEnded={() => {<ReactAudioPlayer src={Win} autoPlay/>}} />
                            </div>;
            
        }
        //If the game is to continue.
        else {
            currentStatus = <div>
                                <p>Here are your previous guesses: </p>
                                <div>{this.props.pastGuesses.join(', ')}</div>
                                <p>You have {this.props.guessesRemaining - this.props.nWrong} guesses left.</p>
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
        nWrong: state.gameState.nWrong,
        pastGuesses: state.gameState.pastGuesses,
        rightGuesses: state.gameState.rightGuesses,
        decisionSound: state.animation.decisionSound,
        guessesRemaining: state.gameState.guessesRemaining,
    }
}

export default connect(mapStateToProps)(StatusScreen);