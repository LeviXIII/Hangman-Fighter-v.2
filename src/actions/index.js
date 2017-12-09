import {
  SET_ANSWER,
  SET_LETTER,
  SET_N_WRONG,
  SET_RIGHT_GUESSES,
  SET_USER_MESSAGE,
  SET_PAST_GAMES,
  SET_PAST_GUESSES,
  SET_CONTINUE_GAME,
  SET_TOTAL_HEALTH1,
  SET_TOTAL_HEALTH2,
  SET_KEN_HIT,
  SET_RYU_HIT,
  SET_START_GAME_FLAG,
  SET_INITIAL_GAME_STATE,
  SET_INITIAL_ANI_STATE,
} from './types';

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    payload: answer
  }
};

export const setLetter = (letter) => {
  return {
    type: SET_LETTER,
    payload: letter
  }
}

export const setNWrong = (nWrong) => {
  return {
    type: SET_N_WRONG,
    payload: nWrong
  }
}

export const setRightGuesses = (rightGuesses) => {
  return {
    type: SET_RIGHT_GUESSES,
    payload: rightGuesses
  }
}

export const setUserMessage = (userMessage) => {
  return {
    type: SET_USER_MESSAGE,
    payload: userMessage
  }
}

export const setPastGames = (pastGames) => {
  return {
    type: SET_PAST_GAMES,
    payload: pastGames
  }
}

export const setPastGuesses = (pastGuesses) => {
  return {
    type: SET_PAST_GUESSES,
    payload: pastGuesses
  }
}

export const setContinueGame = (cont) => {
  return {
    type: SET_CONTINUE_GAME,
    payload: cont
  }
}

export const setStartGameFlag = (startFlag) => {
  return {
    type: SET_START_GAME_FLAG,
    payload: startFlag
  }
}

export const setTotalHealth1 = (health1) => {
  return {
    type: SET_TOTAL_HEALTH1,
    payload: health1
  }
}

export const setTotalHealth2 = (health2) => {
  return {
    type: SET_TOTAL_HEALTH2,
    payload: health2
  }
}

export const setKenHit = (kenHit) => {
  return {
    type: SET_KEN_HIT,
    payload: kenHit
  }
}

export const setRyuHit = (ryuHit) => {
  return {
    type: SET_RYU_HIT,
    payload: ryuHit
  }
}

export const setInitialGameState = () => {
  return {
    type: SET_INITIAL_GAME_STATE,
  }
};

export const setInitialAniState = () => {
  return {
    type: SET_INITIAL_ANI_STATE,
  }
};