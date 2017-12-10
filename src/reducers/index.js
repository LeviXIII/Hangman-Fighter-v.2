import { combineReducers } from 'redux';
import WordReducer from './WordReducer';
import GameStateReducer from './GameStateReducer';
import AnimationReducer from './AnimationReducer';

export default combineReducers({
  words: WordReducer,
  gameState: GameStateReducer,
  animation: AnimationReducer,
})