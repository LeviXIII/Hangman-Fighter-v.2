////////////////////////
// HANGMAN FIGHTER v.2//
////////////////////////

////////////////////////////////
//THINGS I LEARNED (FAILED AT)//
////////////////////////////////

/*
  1.  This was very difficult to change from jQuery and Javascript.
  2.  Sound doesn't work the way I want it to.
  3.  Pictures don't animate the way I want them to due to limitations
      in the package I used (TransitionsGroup).
  4.  Forcing a state change by changing pictures with setState
      produces side-effects.
  5.  Trying to work around one state store is maddening.
  6.  Not sure if Redux would have saved me.
  7.  Any suggestions on how to organize this better would be welcomed.
      As of now, I feel like there are too many corner-case checks
      and it is not very DRY due to having to force state changes.
  8.  React doesn't seem like a good thing to use for this type of
      application (please correct me if I'm wrong.)
  9.  Overall, I feel very limited by state and re-rendering. I want
      to learn how to use shouldComponentUpdate, but I don't feel like
      any of the lifecycle methods would have made my life easier.
      Maybe React isn't the best framework to use for this type of app?
      Please feel free to correct me if I'm wrong.
*/


import React, { Component } from 'react';
import Sound from 'react-sound';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Instructions from './component/Instructions';
import CharImages from './component/CharImages';
import Highscores from './component/Highscores';
import Hangman from './component/Hangman';

import imageTitle from './images/Title-font.png';
import StartSound from './audio/Start-sound.mp3';

import './styles/style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        gameState: {
          words: ['hey','person','you','think','youre','better',
            'than','me','round','one','congratulations'],
          letter: '',
          answer: '',
          nWrong: 0,
          pastGuesses: [],
          rightGuesses: 0,			  //Used to count against the length of the answer.
          pastGames: [],
          continueGame: true,
          guessesRemaining: 6,		//The number of guesses remaining.
          totalHealth1: 6,
          totalHealth2: 100,
          startGameFlag: true,
          kenHit: false,
          ryuHit: false,
          newRound: true,
          decisionSound: false,
          userMessage: 'Please enter a letter in the box below:',
        }
    }
    this.clickGuess = this.clickGuess.bind(this);
  }

  //GameStats Constructor
  GameStats(decision, guessList, guessAmount) {
    this.decision = decision;
    this.guessList = guessList; 
    this.guessAmount = guessAmount;
  }

  //Used to read in data from local storage.
  componentWillMount() {
    let recordStr;

    if (this.state.gameState.startGameFlag === true) {
      //Get records from local storage.
      recordStr = localStorage.getItem("gameRecords");
      let gameRecords = JSON.parse(recordStr);

      if (Array.isArray(gameRecords) === false) {
        gameRecords = [];
      }
      this.startGame(gameRecords);
    }
  }

  //Mainly used to update GameStats to records
  componentWillUpdate() {
    let gameStats = this.state.gameState.pastGames;
    
    //Check to see if the game is over and decides whether to start
    //a new game or not.
    if (this.state.gameState.answer.length === this.state.gameState.rightGuesses
      || this.state.gameState.nWrong >= 6) {
        //Reset the state if starting again.
        if (this.state.gameState.letter === 'y' || this.state.gameState.letter === 'n') {
          //Push the records into pastGames. Must be here in order
          //to only run once.
          if (this.state.gameState.nWrong >= 6) {
            //Add the stats of the game to an array of objects.    
            gameStats.push(new this.GameStats('lose', 
                                          this.state.gameState.pastGuesses,
                                          this.state.gameState.pastGuesses.length));
          }
          else if (this.state.gameState.answer.length === this.state.gameState.rightGuesses){
            //Add the stats of the game to an array of objects.
            gameStats.push(new this.GameStats('win', 
                                          this.state.gameState.pastGuesses,
                                          this.state.gameState.pastGuesses.length));
          }
          this.startGame(gameStats);
        }
    }
  }

  //This function selects a random word as the answer and starts the game.
  //It will only one once per game due to the startGameFlag.
  startGame(newRecord) {
    const index = Math.floor(Math.random()*this.state.gameState.words.length);

    if (this.state.gameState.letter === 'y' || 
      this.state.gameState.startGameFlag === true) {
      
      this.setState({ gameState: {
        ...this.state.gameState,
        answer: this.state.gameState.words[index],
        startGameFlag: false,
        letter: '',
        nWrong: 0,
        pastGuesses: [],
        pastGames: newRecord,
        rightGuesses: 0,			  
        guessesRemaining: 6,		
        totalHealth1: 6,
        totalHealth2: 100,
        newRound: true,
        decisionSound: false,
        userMessage: 'Please enter a letter in the box below:',
      }});
    }
    //Save game records to local storage on browser.
    localStorage.setItem('gameRecords', JSON.stringify(this.state.gameState.pastGames));
  }

  //Proceeds with input from input window.
  submittingLetter = (e) => {
    e.preventDefault();   //Stops the form from refreshing
    this.clickGuess();    //the page.
    
  }

  //Stores the letter given to the input box.
  guessLetter = (e) => {
    
    //This if/else is entirely to try to stop the 'YOU WIN'
    //sound effects from repeating, but it doesn't work properly. 
    if (this.state.gameState.answer.length === this.state.gameState.rightGuesses
      || this.state.gameState.nWrong >= 6) {
        this.setState({ gameState: {
          ...this.state.gameState,
          letter: e.target.value.toLowerCase(),
          newRound: false,
          decisionSound: true,
          }});
    }
    else {
      this.setState({ gameState: {
        ...this.state.gameState,
        letter: e.target.value.toLowerCase(),
        newRound: false,
        }});
    }
  }
  
  //Onclick Function runs the check of the letter and animations
  clickGuess() {
    this.checkLetter();
  }
  
  /* These state updates give a flag to stop rendering
  the hit animations within "CharImages.js". */
  resetAnimations = () => {
    this.setState({ gameState: {
      ...this.state.gameState,
      kenHit: false,
      ryuHit: false,
    }});
  }

  //Logic for updating the game based on a right/wrong guess.
  checkLetter() {
    //Temp storage for updating the state at the end of method.
    let nWrong = this.state.gameState.nWrong;
    let rightGuesses = this.state.gameState.rightGuesses;
    let userMessage;
    let pastGuesses = this.state.gameState.pastGuesses;
    let continueGame = true;
    let totalHealth1 = this.state.gameState.totalHealth1;
    let totalHealth2 = this.state.gameState.totalHealth2;
    let kenHit = false;
    let ryuHit = false;
    let repeat = false;			  //Resets repeat flag on each loop.
    let letterFound = false;	//Flag to proceed with a correct guess.
  
    //Will stop the game after final guess if false.
    if (this.state.gameState.answer.length === this.state.gameState.rightGuesses
      || this.state.gameState.nWrong >= 6) {
      continueGame = false;
    }

    //Uses regex to look for the strings given (case insensitive)
    //due to the "i".
    if (/[a-z]/i.test(this.state.gameState.letter)) {
      //Checks for past guesses.
      for (let i=0; i < this.state.gameState.pastGuesses.length; i++) {
        if (this.state.gameState.letter === this.state.gameState.pastGuesses[i]) {
          userMessage = "You already guessed that letter.";
          repeat = true;
        };
      };

      //Process this section if the guess is not repeated.
      if (repeat === false) {
        //pastGuessesCopy = this.state.gameState.pastGuesses;
        pastGuesses.push(this.state.gameState.letter);
        
        //Goes through answer string to check if guess is correct.
        for (let i=0; i < this.state.gameState.answer.length; i++) {
          if (this.state.gameState.answer[i] === this.state.gameState.letter) {
            letterFound = true;
          }
        }

        //Displays messages to let user know about their guess.
        if (letterFound === true) {
          for (let i=0; i < this.state.gameState.answer.length; i++) {
            if (this.state.gameState.letter === this.state.gameState.answer[i]) {
              rightGuesses = rightGuesses + 1;
            }	
          }
          userMessage = 'You got a letter!';
          totalHealth2 = this.kenAnimation(rightGuesses);
          ryuHit = true;
        }
        else {
          nWrong = nWrong + 1;
          userMessage = 'Sorry, that letter is not in the word.';
          totalHealth1 = this.ryuAnimation();
          kenHit = true;
        }
      };
      
    }
    else {
      userMessage = 'Sorry, your guess isn\'t valid. Please use characters eg. a, E, k, etc.';
    }

    //Clears the input box and set state.
    this.setState({ gameState: {
      ...this.state.gameState,
      letter: '',
      nWrong: nWrong,
      rightGuesses: rightGuesses,
      userMessage: userMessage,
      pastGuesses: pastGuesses,
      continueGame: continueGame,
      totalHealth1: totalHealth1,
      totalHealth2: totalHealth2,
      kenHit: kenHit,
      ryuHit: ryuHit,
    }});

  }

  //This function updates the health bar for Ryu.
  kenAnimation = (rightGuesses) => {
    let totalHealth2 = this.state.gameState.totalHealth2;
   
      return totalHealth2 = 100 - (100*(rightGuesses/this.state.gameState.answer.length));
  } //kenAnimation
  
  //This function updates the health bar for Ken.
  ryuAnimation = () => {
    let totalHealth1 = this.state.gameState.totalHealth1;
    
      return totalHealth1 -= 1;
  } //ryuAnimation
  

  render() {
    return (
      <div>
        <Router>
          <div className="container">
          <div className="titledisplay">
            <span className="linkheading"><Link to="/instructions">Instructions</Link></span>
            <Link to="/"><img className="titlefont" src={imageTitle} /></Link>
            <span className="linkheading"><Link to="/highscores">Records</Link></span>
          </div>
          <Switch>
              <Route path="/" exact render={() =>
                (<Hangman 
                gameState={this.state.gameState}
                clickGuess={this.clickGuess}
                guessLetter={this.guessLetter}
                submittingLetter={this.submittingLetter}
                resetAnimations={this.resetAnimations}
                />) }/>
              <Route path="/instructions" exact component={Instructions} />
              <Route path="/highscores" exact render={() =>
                (<Highscores pastGames={this.state.gameState.pastGames} />)
              }/>
          </Switch>
          </div>
        </Router>
        
        {/* Plays Starting sound effect if it is a new round. */}
        {this.state.gameState.newRound && <Sound
          url={StartSound}
          playStatus={Sound.status.PLAYING}
        />}
      </div>
    );
  }
}

export default App;
