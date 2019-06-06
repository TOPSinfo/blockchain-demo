import t from '../../actions/auth/types';

export default function(
  state = {
    isAuthenticated: false,
    profile:'',
  },
  action
) {
  switch (action.type) {
   
    case  t.SET_USER_ID:
      if (action.payload) {
        state.profile = action.payload;
      }
      return { ...state };
   
    case t.CHECK_AUTH:
      state.isAuthenticated = true;
      return { ...state };
    
    default:
      return state;
  }
}
