import axios from "axios";
import t from './types';
const url ="http://localhost:5000";

// Register User
export const getAllUser = () => dispatch => {
  console.log("called get user");
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

export const registerUser = (userData) => dispatch => {

  const {web3} = userData;

  let {address,privateKey} = web3.eth.accounts.create();

  userData.address=address
  userData.privateKey=privateKey
  delete userData.web3
  delete userData.contract

  axios
    .post(url+"/api/users/register", userData)
    .then((res) =>{console.log("sucess")

    dispatch({
      type: t.REGISTER_USER,
      payload: res.data
    })
  })
    .catch(err =>
        dispatch({
          type: t.GET_ERRORS,
          payload: err.response
        })
    );
};