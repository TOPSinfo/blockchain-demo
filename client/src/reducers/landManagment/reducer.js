import t from '../../actions/auth/types';

export default function(
  state = {
    isAuthenticated: false,
    web3:null,
    accounts:null,
    contract:null
  },
  action
) {
  switch (action.type) {

    case  t.SET_WEB3_INSTANCE:
      if (action.payload) {
        state.web3 = action.payload.web3;
        state.accounts = action.payload.accounts;
        state.contract = action.payload.contract;
      }
      return { ...state };

    case t.CHECK_AUTH:
      state.isAuthenticated = true;
      return { ...state };

    default:
      return state;
  }
}
