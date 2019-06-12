import t from './types';
import config from '../../config/accounts';
import axios from "axios";
const url ="http://localhost:5000";

export const createLand = (data) => dispatch => {

    console.log(data)
    // axios
    // .post(url+"/api/users/register", data)
    // .then(res =>console.log("sucess"))
    // .catch(err =>
    //     dispatch({
    //       type: t.GET_ERRORS,
    //       payload: err.response.data
    //     })
    // );
    // return{ type: t.CREATE_LAND, payload: {}};
};

export const getAllLands = (data) => {
    const {contract} = data;
    var allAccounts = contract.methods.getAllUsers().call();
    return{ type: t.GET_LANDS, payload: allAccounts};
}