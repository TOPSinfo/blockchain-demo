import React, { Component } from 'react';
import History from './history';
import { Router,Route,Switch,Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import TransferLand from './components/TransferLand/TransferLand';
import ManageLands from './components/ManageLands/ManageLands';
import ManageUsers from './components/ManageUsers/ManageUsers';
import About from './components/About/About';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={History}>
      <Switch>
        <Route exact path='/'
            render={ ()=>(<Home/>) }>
        </Route>
         <Route exact path='/login'
            render={ ()=>(<Login />) }>
          </Route>
          <Route exact path='/transfer-land'
            render={ ()=>(<TransferLand />) }>
          </Route>
          <Route exact path='/lands'
            render={ ()=>(<ManageLands />) }>
          </Route>
          <Route exact path='/users'
            render={ ()=>(<ManageUsers web3={this.props.web3} contract={this.props.contract} />) }>
          </Route>
          <Route exact path='/about'
            render={ ()=>(<About />) }>
          </Route>
      </Switch>
    </Router>
    );
  }
}

export default(Routes);


