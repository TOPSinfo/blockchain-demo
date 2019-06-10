import React, { Component } from "react";
import LandManagment from "./contracts/LandManagment.json";
import getWeb3 from "./utils/getWeb3";
import Routes from './routes'
import store from './redux_store/store'
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auths/authActions";

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
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LandManagment.networks[networkId];
      const instance = new web3.eth.Contract(
        LandManagment.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, contract: instance });
    } catch (error) {
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
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
      return <div>Loading ...</div>;
    }
    return (
      <Routes web3={this.state.web3} contract={this.state.contract}/>
    );
  }
}

export default App;
