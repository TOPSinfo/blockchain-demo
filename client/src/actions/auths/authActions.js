import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import t from './types';
const url ="http://localhost:5000";

// Register User
export const registerUser = (userData) => dispatch => {

  const {web3} = userData;

  let {address,privateKey} = web3.eth.accounts.create();

  userData.address=address
  userData.privateKey=privateKey
  delete userData.web3
  delete userData.contract

console.log("userData..................",userData)
  axios
    .post(url+"/api/users/register", userData)
    .then(res =>console.log("sucess"))
    .catch(err =>
        dispatch({
          type: t.GET_ERRORS,
          payload: err.response.data
        })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(url+"/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: t.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return { type: t.SET_CURRENT_USER, payload: decoded };
};

// User loading
export const setUserLoading = () => {
  return { type: t.USER_LOADING };
};

// Log user out
export const logoutUser = () =>  dispatch =>{
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};