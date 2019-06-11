import React, { Component } from 'react';
import History from './history';
import { Router,Route,Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
// import Login1 from './components/Login/Login';
import TransferLand from './components/TransferLand/TransferLand';
import ManageLands from './components/ManageLands/ManageLands';
import ManageUsers from './components/ManageUsers/ManageUsers';
import About from './components/About/About';
import Register from './components/Auth/Register';
import { connect } from "react-redux";
import PrivateRoute from './components/private-route/PrivateRoute'
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {isAuthenticated }=this.props.auth
    return (
      <Router history={History}>
      <Switch>
          <Route exact path='/'
              render={ ()=>(<Home/>) }>
          </Route>

          <Route exact path='/login'
            render={ ()=>(<Login web3={this.props.web3} contract={this.props.contract}/>) }>
          </Route>

          <Route exact path='/about'
            render={ ()=>(<About />) }>
          </Route>

          <Route exact path='/register'
            render={ ()=>(<Register web3={this.props.web3} contract={this.props.contract} />) }>
          </Route>

          <PrivateRoute exact path='/transfer-land'
            component = {TransferLand} >
          </PrivateRoute>
          <PrivateRoute exact path='/lands'  component = {ManageLands}
             web3={this.props.web3} contract={this.props.contract}>
          </PrivateRoute>
          {
            (isAuthenticated && this.props.auth.user.isAdmin) ?
            (<PrivateRoute exact path='/users' component = {ManageUsers}
            web3={this.props.web3} contract={this.props.contract}>
            </PrivateRoute>):
            <Redirect to='/login' />

          }


      </Switch>
    </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{})(Routes);