import { SET_ANSWER } from './types';

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    payload: answer,
  }
};