////////////////////////
// HANGMAN FIGHTER v.2//
////////////////////////

/*  Author: Matthew Thomas  */

/*  This version uses Redux to hold state and uses
    React Router to make a SPA experience. No copyright
    infringement intended.                                */

import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Instructions from './component/Instructions';
import CharImages from './component/CharImages';
import Highscores from './component/Highscores';
import Hangman from './component/Hangman';

import imageTitle from './images/Title-font.png';
import startSound from './audio/Start-sound.mp3';

import './styles/style.css';

class App extends Component {

  //GameStats Constructor
  GameStats(decision, guessList, guessAmount) {
    this.decision = decision;
    this.guessList = guessList; 
    this.guessAmount = guessAmount;
  }

  componentWillMount() {
    
    //Get records from local storage.
    let recordStr = localStorage.getItem("gameRecords");
    
    if (recordStr !== null) {
      let gameRecords = JSON.parse(recordStr);
      this.props.setPastGames(gameRecords);
    }
  
    this.startGame();
  }

  //This function selects a random word as the answer and starts the game.
  //It will only one once per game due to the startGameFlag.
  startGame = () => {
    
    if (this.props.letter === 'y') {
      this.props.setInitialGameState();
      this.props.setInitialAniState();
      this.props.setPastGuesses([]);
    }
    
    //Sets up the answer for the game.
    const index = Math.floor(Math.random()*this.props.words.length);
    this.props.setAnswer(this.props.words[index]);

    //Since initial state will wipe past games, must pull it again from local storage.
    let recordStr = localStorage.getItem("gameRecords");
    
    if (recordStr !== null) {
      let gameRecords = JSON.parse(recordStr);
      this.props.setPastGames(gameRecords);
    }
  }

  //Stores the letter given to the input box.
  guessLetter = (e) => {
    this.props.setLetter(e.target.value.toLowerCase());
  }

  //Logic for updating the game based on a right/wrong guess.
  checkLetter = (e) => {
    e.preventDefault();
    
    //Temp storage for updating the state at the end of method.
    let nWrong = this.props.nWrong;
    let rightGuesses = this.props.rightGuesses;
    let userMessage;
    let pastGuesses = this.props.pastGuesses;
    let totalHealth1 = this.props.totalHealth1;
    let totalHealth2 = this.props.totalHealth2;
    let kenHit = false;
    let ryuHit = false;
    let repeat = false;			              //Resets repeat flag on each loop.
    let letterFound = false;	            //Flag to proceed with a correct guess.
    let gameStats = this.props.pastGames;

    //If the game is at a win/lose condition.
    if (this.props.answer.length === this.props.rightGuesses || this.props.nWrong >= 6) {
      if (this.props.nWrong >= 6) {
        //Add the stats of the game to an array of objects.    
        gameStats.push(new this.GameStats('lose', 
                                      this.props.pastGuesses,
                                      this.props.pastGuesses.length));
      }
      else {
        //Add the stats of the game to an array of objects.
        gameStats.push(new this.GameStats('win', 
                                      this.props.pastGuesses,
                                      this.props.pastGuesses.length));
      }
      //Save game records to local storage on browser.
      this.props.setPastGames(gameStats);
      localStorage.setItem('gameRecords', JSON.stringify(this.props.pastGames));
      
      if (this.props.letter === 'y') {
        this.startGame();
      }
      else if (this.props.letter === 'n') {
        this.props.setContinueGame(false);
      }
    }
    //Else the game is in a continue condition...
    else {
    
      //Uses regex to look for the strings given (case insensitive)
      //due to the "i".
      if (/[a-z]/i.test(this.props.letter)) {
        //Checks for past guesses.
        for (let i=0; i < this.props.pastGuesses.length; i++) {
          if (this.props.letter === this.props.pastGuesses[i]) {
            userMessage = "You already guessed that letter.";
            repeat = true;
          };
        };

        //Process this section if the guess is not repeated.
        if (repeat === false) {
          
          let pastGuesses = this.props.pastGuesses;
          pastGuesses.push(this.props.letter);
          this.props.setPastGuesses(pastGuesses);
          
          //Goes through answer string to check if guess is correct.
          for (let i=0; i < this.props.answer.length; i++) {
            if (this.props.answer[i] === this.props.letter) {
              letterFound = true;
            }
          }

          //Displays messages to let user know about their guess.
          if (letterFound === true) {
            for (let i=0; i < this.props.answer.length; i++) {
              if (this.props.letter === this.props.answer[i]) {
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
      this.props.setLetter('');
      this.props.setNWrong(nWrong);
      this.props.setRightGuesses(rightGuesses);
      this.props.setUserMessage(userMessage);
      this.props.setPastGuesses(pastGuesses);
      this.props.setTotalHealth1(totalHealth1);
      this.props.setTotalHealth2(totalHealth2);
      this.props.setKenHit(kenHit);
      this.props.setRyuHit(ryuHit);
    } //end if
  }; //end checkLetter

  //This function updates the health bar for Ryu.
  kenAnimation = (rightGuesses) => {
    let totalHealth2 = this.props.totalHealth2;
   
    return totalHealth2 = 100 - (100*(rightGuesses/this.props.answer.length));
  } //kenAnimation
  
  //This function updates the health bar for Ken.
  ryuAnimation = () => {
    let totalHealth1 = this.props.totalHealth1;
    
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
                (<Hangman guessLetter={this.guessLetter} checkLetter={this.checkLetter} />)}/>
              <Route path="/instructions" exact component={Instructions} />
              <Route path="/highscores" exact render={() => (<Highscores />) }/>
          </Switch>
          </div>
        </Router>
        
        
        {/* Plays Starting sound effect if it is a new round. */}
        <ReactAudioPlayer src={startSound} autoPlay/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    words: state.words,
    answer: state.gameState.answer,
    letter: state.gameState.letter,
    nWrong: state.gameState.nWrong,
    pastGames: state.gameState.pastGames,
    pastGuesses: state.gameState.pastGuesses,
    rightGuesses: state.gameState.rightGuesses,
    totalHealth1: state.animation.totalHealth1,
    totalHealth2: state.animation.totalHealth2,
    kenHit: state.animation.kenHit,
    ryuHit: state.animation.ryuHit,
  };
};

export default connect(mapStateToProps, actions)(App);
