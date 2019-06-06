import t from './types';

export const checkAuthentication = (payload) => async dispatch => {
console.log("payload...........",payload)
  dispatch({ type: t.CHECK_AUTH, payload: payload });
};

export const setUserId = (payload) => async dispatch => {
  console.log("setUserIdsetUserId",payload)
  dispatch({ type: t.SET_USER_ID, payload: currentUser });
};
