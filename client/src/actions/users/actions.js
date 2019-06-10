import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import t from './types';
const url ="http://localhost:5000";

// Register User
export const getAllUser = (userData, history) => dispatch => {
  axios
    .post(url+"/api/users/getallusers", userData)
    .then(res => {
        console.log("res................",res)
        dispatch({
        type: t.GET_USERS,
        payload: res.response.data
      })})
    .catch(err =>  
        dispatch({
          type: t.GET_ERRORS,
          payload: err.response.data
        })
    );
};