import React, { Component } from "react";
import Header from '../Header/Header';
import "./About.css";

class TransferLand extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
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
                <div className="about">
                    <h2>Land Managment System</h2><br />
                    <h6>Blockchain Demo<br />Tops Infosolutions Pvt. Ltd.<br></br>Copyright ©2019 All rights reserved</h6>
                </div>
            </React.Fragment>
        );
    }
}

export default TransferLand;
