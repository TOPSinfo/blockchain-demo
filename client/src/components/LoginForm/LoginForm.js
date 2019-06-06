import React, { Component } from "react";
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
class LoginForm extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
        <React.Fragment>
           <h1>Login Screen Loading</h1>
        </React.Fragment>
        );
    }
}

// export default withRouter ( connect(mapStateToProps)(Home));

export default withRouter (LoginForm);
