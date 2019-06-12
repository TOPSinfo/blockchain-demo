import React, { Component } from "react";
import LandManagment from "./contracts/LandManagment.json";
import getWeb3 from "./utils/getWeb3";
import Routes from './routes'
import store from './redux_store/store'
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auths/authActions";
import Loader from './components/Loader/Loader'

import "./App.css";


if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {

    const web3 = await getWeb3();
    const contractAddress = '0x25815F61e5Fde60f48b0657795627b7d303aa193'
    const contractABI = [{"constant":false,"inputs":[{"name":"ownerAddress","type":"address"}],"name":"getLandByUser","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"landName","type":"string"},{"name":"ownerAddress","type":"address"}],"name":"createLand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fromAddress","type":"address"},{"name":"toAddress","type":"address"},{"name":"landId","type":"uint256"}],"name":"transferLand","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"landId","type":"uint256"}],"name":"getLandName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lands","outputs":[{"name":"landId","type":"uint256"},{"name":"landName","type":"string"},{"name":"ownerAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
    const instance = new web3.eth.Contract(contractABI, contractAddress)

    this.setState({ web3, contract: instance });
    } catch (error) {
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.set(5).send({ from: accounts[0] });
    const response = await contract.methods.get().call();

    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div className="center"><Loader /></div>;
    }
    return (
      <Routes web3={this.state.web3} contract={this.state.contract}/>
    );
  }
}

export default App;
