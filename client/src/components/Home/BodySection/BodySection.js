import React, { Component } from "react";
import logo from '../../../asserts/img/bitcoin.png';
import BlogContent from '../BlogContent/BlogContent';

class BodySection extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment> 
                <section className="banner-area relative" id="home">
                    <div className="overlay overlay-bg"></div>		
                    <div className="container">
                        <div className="row fullscreen d-flex align-items-center justify-content-start">
                            <div className="banner-content col-lg-12 col-md-12">
                                <h5 className="text-white text-uppercase"></h5>
                                <h1 className="text-uppercase">
                                    Etherium Blockchain
                                </h1>
                                <p className="text-white pt-20 pb-20">
                                    Tranfering the Land
                                </p>
                                <a href="#" className="primary-btn header-btn text-uppercase">Buy Bitcoin</a>
                            </div>												
                        </div>
                    </div>
                </section>
                    
                <section className="convert-area" id="convert">
                    <div className="container">
                        <div className="convert-wrap">
                            <div className="row justify-content-center align-items-center flex-column pb-30">
                                <h1 className="text-white">The Currency Converter</h1>
                                <p className="text-white">Who are in extremely love with eco friendly system.</p>							
                            </div>
                            <div className="row justify-content-center align-items-start">
                                <div className="col-lg-2 cols-img">
                                    <img className="d-block mx-auto" src={logo} alt=""/>
                                </div>
                                <div className="col-lg-3 cols">
                                    <input type="text" name="feet" placeholder="feet" className="form-control mb-20"/>
                                    <input type="text" name="pounds" placeholder="pounds" className="form-control mb-20"/>
                                </div>
                                <div className="col-lg-3 cols">
                                    <input type="text" name="feet" placeholder="inches" className="form-control mb-20"/>
                                    <input type="text" name="pounds" placeholder="pounds" className="form-control mb-20"/>
                                    <a href="#" className="primary-btn header-btn text-uppercase mb-20">Transfer Land</a>
                                </div>
                            </div>						
                        </div>
                    </div>	
                </section> 
                <BlogContent/>
            </React.Fragment>
        );
    }
}

export default BodySection;


