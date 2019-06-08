import t from '../../actions/landManagment/types';

export default function(
  state = {
    newAccountId:null,
    allAccounts:null,
    newAccountReciept:null,
    newUserAdded:false
  },
  action
) {
  switch (action.type) {

    case  t.CREATE_ACCOUNT:
      if (action.payload) {
        console.log("..............aaaaa.............",'newAccount'in action.payload)

        state.newUserAdded = true;
        state.newAccountId = action.payload.newAccount;
        state.newAccountReciept = action.payload.reciept;
      }
      console.log("state...............",state)
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
