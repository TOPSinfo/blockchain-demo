import t from '../../actions/users/types';

export default function (
  state = {
    newAccountId: null,
    allAccounts: [],
    newAccountReciept: null,
    newUserAdded: false
  },
  action
) {
  let array = state.allAccounts
  array.push(action.payload)
  switch (action.type) {

    case t.REGISTER_USER:
      if (action.payload) {
        state.newUserAdded = true;
        state.newAccountId = action.payload.newAccount;
        state.newAccountReciept = action.payload.reciept;
        state.allAccounts = array
      }
      return { ...state };

    case t.GET_USERS:
      if (action.payload) {
        state.newUserAdded = false;
        state.allAccounts = action.payload;
      }
      return { ...state };
    default:
      return state;
  }
}
