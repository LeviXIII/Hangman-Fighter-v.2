import {
  SET_ANSWER,
  SET_LETTER,
  SET_N_WRONG,
  SET_RIGHT_GUESSES,
  SET_USER_MESSAGE,
  SET_PAST_GAMES,
  SET_PAST_GUESSES,
  SET_CONTINUE_GAME,
  SET_START_GAME_FLAG,
  SET_INITIAL_GAME_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  answer: '',
  letter: '',
  nWrong: 0,
  pastGuesses: [],
  rightGuesses: 0,
  pastGames: [],
  continueGame: true,
  guessesRemaining: 6,
  userMessage: 'Please enter a letter in the box below:',
};

//If state is undefined, it state will be equal to initial state and return (ES6)
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ANSWER:
      //Made a new object and put all the state on it along with the new answer.
      return { ...state, answer: action.payload }; 
    case SET_LETTER:
      return { ...state, letter: action.payload };
    case SET_N_WRONG:
      return { ...state, nWrong: action.payload };
    case SET_RIGHT_GUESSES:
      return { ...state, rightGuesses: action.payload };
    case SET_USER_MESSAGE:
      return { ...state, userMessage: action.payload };
    case SET_PAST_GAMES:
      return { ...state, pastGames: (action.payload) };
    case SET_PAST_GUESSES:
      return { ...state, pastGuesses: action.payload };
    case SET_CONTINUE_GAME:
      return { ...state, continueGame: action.payload };
    case SET_START_GAME_FLAG:
      return { ...state, startGameFlag: action.payload };
    case SET_INITIAL_GAME_STATE:
      return INITIAL_STATE;
    default:
      return state;   //Returns whatever state it was at from the last time the reducer ran.
  }
  
}