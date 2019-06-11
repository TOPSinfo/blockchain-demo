import t from './types';



export const loginUser = (data) => {
  const {username, password, contract} = data;
  var checkIfUserExists = contract.methods.checkIfUserExists(username,password).call();
  checkIfUserExists.then((data)=>{
    alert(data)
  }).catch((err)=>{
    console.log(err)
  })

  return{ type: t.CHECK_AUTH, payload: {} };
};


export const setUserId = (payload) => {
  return{ type: t.SET_USER_ID, payload: payload };
};
