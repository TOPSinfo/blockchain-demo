import React, { Component } from 'react';
import History from './history';
import { Router,Route,Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
// import Login1 from './components/Login/Login';
import TransferLand from './components/TransferLand/TransferLand';
import ManageLands from './components/ManageLands/ManageLands';
import ManageUsers from './components/ManageUsers/ManageUsers';
import About from './components/About/About';
import Register from './components/Auth/Register';
import PrivateRoute from './components/private-route/PrivateRoute'
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

          <Route exact path='/about'
            render={ ()=>(<About />) }>
          </Route>

          <Route exact path='/register'
            render={ ()=>(<Register />) }>
          </Route>

          {/* <Route exact path='/register'
            render={ ()=>(<Login1 />) }>
          </Route> */}

          <PrivateRoute exact path='/transfer-land'
            component = {TransferLand} >
          </PrivateRoute>
          <PrivateRoute exact path='/lands'  component = {ManageLands}
             web3={this.props.web3} contract={this.props.contract}>
          </PrivateRoute>
          <PrivateRoute exact path='/users' component = {ManageUsers}
             web3={this.props.web3} contract={this.props.contract}> 
          </PrivateRoute>
          
          
      </Switch>
    </Router>
    );
  }
}

export default(Routes);



{/* <Provider store={store}>
<Router>
  <div className="App">
    <Navbar />
    <Route exact path="/" component={Landing} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
</Router>
</Provider> */}


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
