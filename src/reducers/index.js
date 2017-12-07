import { combineReducers } from 'redux';
import WordReducer from './WordReducer';
import GameStateReducer from './GameStateReducer';

export default combineReducers({
  words: WordReducer,
  gameState: GameStateReducer,
})