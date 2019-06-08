import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import landManagmentReducer from './landManagment/reducer'

export default combineReducers({
  auth: authReducer,
  landManagment:landManagmentReducer
});
