import { combineReducers } from 'redux';

import authReducer from "./auth/authReducer";
import errorReducer from "./auth/errorReducer";


import usersReducer from './users/reducer';
import landManagmentReducer from './landManagment/reducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  landManagment:landManagmentReducer,
  users:usersReducer
});


