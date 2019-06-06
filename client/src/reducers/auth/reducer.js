import t from '../../actions/auth/types';

export default function(
  state = {
    isAuthenticated: false,
    profile: {},
  },
  action
) {
  switch (action.type) {
    case t.LOGIN:
      if (action.payload) {
        state.isAuthenticated = true;
      }
      return { ...state };
    case t.LOGOUT:
      state.isAuthenticated = false;
      return { ...state };
    case t.CHECK_AUTH:
      state.isAuthenticated = true;
      return { ...state };
    
    default:
      return state;
  }
}
