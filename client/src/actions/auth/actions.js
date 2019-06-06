import t from './types';

export const checkAuthentication = (payload) => {
  return{ type: t.CHECK_AUTH, payload: payload };
};

export const setUserId = (payload) => {
  return{ type: t.SET_USER_ID, payload: payload };
};
