import t from './types';
import config from '../../config/accounts';

export const createUserAccount = (data) => {
    const {web3, contract, username, password} = data;
    var newAccount = web3.eth.personal.newAccount(password);

    var payloadData = {};
    newAccount.then((data)=>{
        payloadData.newAccount= data;
        var createdAccount = contract.methods.addUser(username,password,data,false).send({ from: config()[0],gas:3000000 })
        createdAccount.then((data)=>{
            payloadData.reciept= data;
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=> {
        console.log(err)
    })
    return{ type: t.CREATE_ACCOUNT, payload: payloadData};
};

export const getAllUsers = (data) => {
    const {contract} = data;
    var allAccounts = contract.methods.getAllUsers().call();
    return{ type: t.GET_USERS, payload: allAccounts};
}

export const createLand = (data) => {
    // const {web3, contract, landName} = data;

    // var createLand = contract.methods.createLand()
    return{ type: t.CREATE_LAND, payload: {}};
};

export const getAllLands = (data) => {
    const {contract} = data;
    var allAccounts = contract.methods.getAllUsers().call();
    return{ type: t.GET_LANDS, payload: allAccounts};
}