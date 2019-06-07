import React, { Component } from "react";

import logo from '../../asserts/img/logo.png';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    handleComponentChange=(e,pathName)=>{
        this.props.history.push({pathname:pathName})
    }
    render() {
        return (
            <header id="header" className="header-top">
            <div className="container">
                <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                    <a onClick={(e)=> this.handleComponentChange(e,"/")}><img src={logo} alt="" title="" /></a>
                </div>
                <nav id="nav-menu-container">
                    <ul className="nav-menu">
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/")}>Home</a></li>
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/transfer-land")}>Transfer</a></li>
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/lands")}>View and Create</a></li>
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/users")}>Users</a></li>
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/about")}>About</a></li>
                    </ul>
                </nav>
                </div>
            </div>
        </header>
        );
    }
}

export default withRouter (Header);
