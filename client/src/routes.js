import React, { Component } from 'react';
import History from './history';
import { Router,Route,Switch,Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import LoginForm from './components/LoginForm/LoginForm'



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
           <Route exact path='/LoginForm' 
            render={ ()=>(<LoginForm />) }>
          </Route>
        </Switch>
      </Router> 
    );
  }
}

export default(Routes);


