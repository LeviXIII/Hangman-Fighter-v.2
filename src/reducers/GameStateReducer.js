import { SET_ANSWER } from '../actions/types';

const INITIAL_STATE = {
  answer: '',
};

//If state is undefined, it state will be equal to initial state and return (ES6)
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ANSWER:
      //Made a new object and put all the state on it along with the new answer.
      return { ...state, answer: action.payload }; 
    default:
      return state;   //Returns whatever state it was at from the last time the reducer ran.
  }
  // return {
  //   letter: '',
  //   answer: '',
  //   nWrong: 0,
  //   pastGuesses: [],
  //   rightGuesses: 0,			  //Used to count against the length of the answer.
  // }
}