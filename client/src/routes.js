import React, { Component } from 'react';
import History from './history';
import { Router,Route,Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import TransferLand from './components/TransferLand/TransferLand';
import ManageLands from './components/ManageLands/ManageLands';
import ManageUsers from './components/ManageUsers/ManageUsers';
import About from './components/About/About';
import Register from './components/Auth/Register'
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
            render={ ()=>(<Login web3={this.props.web3} contract={this.props.contract}/>) }>
          </Route>
          <Route exact path='/transfer-land'
            render={ ()=>(<TransferLand />) }>
          </Route>
          <Route exact path='/lands'
            render={ ()=>(<ManageLands web3={this.props.web3} contract={this.props.contract}/>) }>
          </Route>
          <Route exact path='/users'
            render={ ()=>(<ManageUsers web3={this.props.web3} contract={this.props.contract} />) }>
          </Route>
          <Route exact path='/about'
            render={ ()=>(<About />) }>
          </Route>
          <Route exact path='/register'
            render={ ()=>(<Register />) }>
          </Route>
          
      </Switch>
    </Router>
    );
  }
}

export default(Routes);




// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       auth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
