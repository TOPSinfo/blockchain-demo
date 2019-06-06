import React, { Component } from "react";
ader.js
import logo from '../../asserts/img/logo.png';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick=(e)=>{
        console.log("click")
        this.props.history.push({pathname:"/LoginForm"})
    }
    render() {
        return (
            <header id="header" className="header-top">
            <div className="container">
                <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                    <a href=""><img src={logo} alt="" title="" /></a>
                </div>
                <nav id="nav-menu-container">
                    <ul className="nav-menu">
                    <li className="menu-active"><a href="#">Home</a></li>
                    <li><a href="#">Transfer</a></li>
                    <li><a href="#">View and Create</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">About</a></li>
                    </ul>
                </nav>
                </div>
            </div>
        </header>
        );
    }
}

export default withRouter (Header);
