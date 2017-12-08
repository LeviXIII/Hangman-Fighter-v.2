import {
  SET_TOTAL_HEALTH1,
  SET_TOTAL_HEALTH2,
  SET_KEN_HIT,
  SET_RYU_HIT,
  SET_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
  totalHealth1: 6,
  totalHealth2: 100,
  kenHit: false,
  ryuHit: false,
  decisionSound: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOTAL_HEALTH1:
      return { ...state, totalHealth1: action.payload };
    case SET_TOTAL_HEALTH2:
      return { ...state, totalHealth2: action.payload };
    case SET_KEN_HIT:
      return { ...state, kenHit: action.payload };
    case SET_RYU_HIT:
      return { ...state, ryuHit: action.payload };
    case SET_INITIAL_STATE:
      return { ...state, state: INITIAL_STATE }; 
    default:
      return state;   //Returns whatever state it was at from the last time the reducer ran.
  } 
}