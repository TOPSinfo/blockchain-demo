import t from '../../actions/users/types';

export default function(
  state = {
    newAccountId:null,
    allAccounts:[],
    newAccountReciept:null,
    newUserAdded:false
  },
  action
) {
  switch (action.type) {

    case  t.REGISTER_USER:
      if (action.payload) {
        // state.allAccounts
        state.newUserAdded = true;
        state.newAccountId = action.payload.newAccount;
        state.newAccountReciept = action.payload.reciept;
        
      }
      return { ...state };

    case t.GET_USERS:
      if(action.payload){
          state.newUserAdded = false;
          state.allAccounts = action.payload;
      }
      return {...state};
    default:
      return state;
  }
}
