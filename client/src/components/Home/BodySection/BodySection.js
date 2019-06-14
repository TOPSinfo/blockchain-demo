import React, { Component } from "react";
import Sections from './Sections/Sections';

class BodySection extends Component {



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
                <Sections />
            </React.Fragment>
        );
    }
}

export default BodySection;


