import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {authActions}  from "../../actions"
import './login.css'
class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInputValue: "",
            pwdInputValue: "",
            title: "login Page"
        };
        this.handleUserinputs = this.handleUserinputs.bind(this);
        this.handlePwdinputs = this.handlePwdinputs.bind(this);
    }

    onSubmits(e, obj) {
        e.preventDefault()
        console.log("obj..........",obj.user)
        this.props.setUserId(obj.user)
        if (obj) {
            // this.props.history.push({ pathname: "/Profile" })
        }
    }

    handleUserinputs(e) {
        e.preventDefault()
        this.setState({
            userInputValue: e.target.value,
        })
    }
  
    handlePwdinputs(e) {
        e.preventDefault()
        this.setState({
            pwdInputValue: e.target.value,
        })
    }

    render() {
            console.log("this.props..............",this.props.authActions)
        return (
            <div className="login-container">
                <div ><h1>{this.state.title}</h1> </div>
                <form onSubmit={(e) => this.onSubmits(e, { user: this.state.userInputValue, pwd: this.state.pwdInputValue })} >
                    UserName<input type="text" name="userInputValue" placeholder="Username"
                        defaultValue={this.props.email}
                        onChange={this.handleUserinputs} required />
                    Password<input type="password" name="pwdInputValue" placeholder="Password"
                        defaultValue={this.props.password} onChange={this.handlePwdinputs} required />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default  withRouter ( connect(null,{
    setUserId:authActions.setUserId
})(LoginForm));

