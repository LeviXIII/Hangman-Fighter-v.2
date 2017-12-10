import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserInputs extends Component {
    render() {
        let buttonMsg;
        let userPrompt;
        
        //Changes the prompts depending on game's state.
        if (this.props.answer.length === this.props.rightGuesses || this.props.nWrong >= 6) {
                userPrompt = 'Next Round? y/n';
                buttonMsg = 'Submit';
        }
        else {
            userPrompt = this.props.userMessage;
            buttonMsg = 'Guess';
        }

        return (
            <div>
                { /* Prompts update as game unfolds */}
                <p id="prompts">{userPrompt}</p>
                <div>
                    <form onSubmit={e => this.props.checkLetter(e)}>
                        <input  id="userinput" 
                                maxLength="1"
                                type="text"
                                autoComplete="off"
                                value={this.props.letter}
                                onChange={e => this.props.guessLetter(e)}
                        />
                    </form>
                    <button id="guess" onClick={this.props.checkLetter}>{buttonMsg}</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        answer: state.gameState.answer,
        letter: state.gameState.letter,
        rightGuesses: state.gameState.rightGuesses,
        nWrong: state.gameState.nWrong,
        userMessage: state.gameState.userMessage,
    }
}

export default connect(mapStateToProps)(UserInputs);