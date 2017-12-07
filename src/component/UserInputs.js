import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserInputs extends Component {
    render() {
        let buttonMsg;
        let userPrompt;
        
        //Changes the prompts depending on game's state.
        if (this.props.answer.length === this.props.gameState.rightGuesses
            || this.props.gameState.nWrong >= 6) {
                userPrompt = 'Next Round? y/n';
                buttonMsg = 'Submit';
        }
        else {
            userPrompt = this.props.gameState.userMessage;
            buttonMsg = 'Guess';
        }

        return (
            <div>
                { /* Prompts update as game unfolds */}
                <p id="prompts">{userPrompt}</p>
                <div>
                    <form onSubmit={this.props.submittingLetter}>
                        <input  id="userinput" 
                                maxLength="1"
                                type="text"
                                autoComplete="off"
                                value={this.props.gameState.letter}
                                onChange={this.props.guessLetter}
                        />
                    </form>
                    <button id="guess" onClick={this.props.clickGuess}>{buttonMsg}</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        answer: state.gameState.answer,
    }
}

export default connect(mapStateToProps)(UserInputs);