import axios from "axios";
import t from './types';
const url ="http://localhost:5000";

// Register User
export const getAllUser = () => dispatch => {
  axios
    .get(url+"/api/users/getallusers")
    .then(res => 
        dispatch({
            type: t.GET_USERS,
            payload: res.data.users
        })
      )
    .catch(err =>  
        dispatch({
          type: t.GET_ERRORS,
          payload: "Error"
        })
    );
};