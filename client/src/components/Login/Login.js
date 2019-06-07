import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {authActions}  from "../../actions"
import './login.css';
import logo from '../../asserts/img/bitcoin.png';

class Login extends Component {

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
        return (
        <React.Fragment>
            <section className="banner-area relative" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row fullscreen d-flex align-items-center justify-content-start">
                        <div className="banner-content col-lg-12 col-md-12">
                            {/* <h5 className="text-white text-uppercase"></h5> */}
                            <h1 className="text-uppercase">
                                &nbsp;
                            </h1>
                            <p className="text-white pt-20 pb-20">
                                &nbsp;
                            </p>
                            {/* <a href="#" className="primary-btn header-btn text-uppercase">Buy Bitcoin</a> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="convert-area bg" id="convert">
        <div className="container">
            <div className="convert-wrap">
                <div className="row justify-content-center align-items-center flex-column pb-30">
                    <h1 className="text-white">Login</h1>
                </div>
                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-2 cols-img">
                        <img className="d-block mx-auto" src={logo} alt=""/>
                    </div>
                    <div className="col-lg-4 cols">
                        <input type="text" name="feet" placeholder="Username" className="form-control mb-20"/>
                        <input type="text" name="feet" placeholder="Password" className="form-control mb-20"/>
                            <a className="primary-btn header-btn text-uppercase mb-20 login-button">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
        );
    }
}

export default  withRouter ( connect(null,{
    setUserId:authActions.setUserId
})(Login));

