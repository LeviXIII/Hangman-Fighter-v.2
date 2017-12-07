import React, { Component } from 'react';

import '../styles/style.css';

class Instructions extends Component {
    render() {
        return (
            <div>
                <h1 className="headingfont">Instructions</h1>
                <ol className="headingfont">
                    <li>Place your guess into the input box.
                        You can click the button or press enter to
                        register your guess.
                    </li>
                    <br />
                    <li>
                        Depending on whether your guess is correct or not
                        a message will display in the middle of the screen.
                    </li>
                    <br />
                    <li>
                        You have 6 guesses to get all the words otherwise,
                        you lose.
                    </li>
                    <br />
                    <li>
                        At the end of each game, you should enter 'y' or 'n'
                        and press enter or click on the 'Submit' button to play
                        again or quit.
                    </li>
                    <br />
                    <li>
                        After quitting, the game will display how well you did
                        in the rounds that you played. You can also reach this
                        screen by clicking the link at any time.
                    </li>
                    <br />
                    <li>
                        You can click the "Hangman Fighter" title at any time to
                        get back to the main game.
                    </li>
                </ol>
            </div>
        )
    }
}

export default Instructions;