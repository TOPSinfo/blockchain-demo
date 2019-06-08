import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import t from './types';

// Register User
export const registerUser = (userData, history) => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      {
        return{ type: t.GET_ERRORS, payload: err.response.data }
      }
    );
};

// Login - get user token
export const loginUser = userData => {
  axios
    .post("/api/users/login", userData)
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
      return(setCurrentUser(decoded));
    })
    .catch(err =>{
      return{ type: t.GET_ERRORS, payload: err.response.data }
    });
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
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  return(setCurrentUser({}));
};