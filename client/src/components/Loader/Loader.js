import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './Loader.css';


class Loader extends Component {



    render() {
        return (
            <div class="lds-dual-ring"></div>
        );
    }
}


export default Loader

