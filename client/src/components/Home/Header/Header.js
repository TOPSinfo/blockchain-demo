import React, { Component } from "react";
import logo from '../../../asserts/img/logo.png'
class Header extends Component {
    
    constructor(props){
        super(props);

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
                    <li className="menu-active"><a href="#home">Home</a></li>
                    <li><a href="#convert">Convert</a></li>   
                    <li><a href="#feature">Feature</a></li>
                    <li><a href="#price">Price</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li className="menu-has-children"><a href="">Pages</a>
                        <ul>
                        <li><a href="generic.html">Generic</a></li>
                        <li><a href="elements.html">Elements</a></li>
                        </ul>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>
        </header>
        );
    }
}

export default Header;
