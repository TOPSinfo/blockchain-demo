import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/index";
import PropTypes from "prop-types";

import logo from '../../asserts/img/logo.png';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    handleComponentChange=(e,pathName)=>{
        this.props.history.push({pathname:pathName})
    }

    onLogoutClick = e => {
        e.preventDefault();
        console.log("called")
        this.props.logoutUser();
      };

    render() {
        const {isAuthenticated }=this.props.auth 
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
                    <li><a onClick={(e)=> this.handleComponentChange(e,"/about")}>About</a></li>
                    {
                        (isAuthenticated && this.props.auth.user.isAdmin )?
                            (<React.Fragment>
                                <li><a onClick={(e)=> this.handleComponentChange(e,"/transfer-land")}>Transfer</a></li>
                                <li><a onClick={(e)=> this.handleComponentChange(e,"/lands")}>View and Create</a></li>
                                    <li><a onClick={(e)=> this.handleComponentChange(e,"/users")}>Users</a></li>
                                        <li><a onClick={(e)=> this.onLogoutClick(e)}>Log Out</a></li>
                            </React.Fragment>
                             ) 
                            :
                            (
                            isAuthenticated && !this.props.auth.user.isAdmin )?
                            (<React.Fragment>
                                <li><a onClick={(e)=> this.handleComponentChange(e,"/transfer-land")}>Transfer</a></li>
                                <li><a onClick={(e)=> this.handleComponentChange(e,"/lands")}>View and Create</a></li>
                                    {/* <li><a onClick={(e)=> this.handleComponentChange(e,"/users")}>Users</a></li> */}
                                        <li><a onClick={(e)=> this.onLogoutClick(e)}>Log Out</a></li>
                            </React.Fragment>
                             ) :
                            (<li><a onClick={(e)=> this.handleComponentChange(e,"/login")}>Log In</a></li>)
                    }
                    
                    </ul>
                </nav>
                </div>
            </div>
        </header>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,{
        logoutUser:loginUser.logoutUser
    }
  )(withRouter(Header));
  
  