import t from './types';
import config from '../../config/accounts';
import axios from "axios";
const url ="http://localhost:5000";

export const createLand = (data) => dispatch => {
    axios
    .post(url+"/api/lands/createland", data)
    .then((res)=>{
        res.landCreated=true;
        dispatch({
            type: t.CREATE_LAND,
            payload: res
        })
    })
    .catch(err =>
        console.log(err)
    );
};

export const getAllLands = () => dispatch => {
    axios
    .get(url+"/api/lands/getallland")
    .then((res)=>{
        dispatch({
            type: t.GET_ALL_LANDS,
            payload: res.data
        })
    })
    .catch(err =>
        console.log(err)
    );
};

export const getAllLandsByOwner = (data) => dispatch => {
    axios
    .post(url+"/api/lands/get-land-by-owner",data)
    .then((res)=>{
        dispatch({
            type: t.GET_LANDS_BY_USER,
            payload: res.data
        })
    })
    .catch(err =>
        console.log(err)
    );
};

export const transferLand = (data) => dispatch => {
    axios
    .post(url+"/api/lands/transfer-land",data)
    .then((res)=>{
        dispatch({
            type: t.TRANSFER_LAND,
            payload: res.data
        })
    })
    .catch(err =>
        console.log(err)
    );
};
