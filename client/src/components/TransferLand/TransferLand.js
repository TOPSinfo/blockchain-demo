import React, { Component } from "react";
import logo from '../../asserts/img/bitcoin.png';
import Header from'../Header/Header';

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
            <section className="convert-area bg" id="convert">
        <div className="container">
            <div className="convert-wrap">
                <div className="row justify-content-center align-items-center flex-column pb-30">
                    <h1 className="text-white">Tansfer Land</h1>
                    <p className="text-white">You can transfer land owned by you to any of the member of blockchain.</p>
                </div>
                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-2 cols-img">
                        <img className="d-block mx-auto" src={logo} alt=""/>
                    </div>
                    <div className="col-lg-6 cols">
                        <input type="text" name="feet" placeholder="Username" className="form-control mb-20"/>
                        <div className="single-element-widget mt-30">
							<div className="default-select" id="default-select">
								<select>
									<option value="1">English</option>
									<option value="1">Spanish</option>
									<option value="1">Arabic</option>
									<option value="1">Portuguise</option>
									<option value="1">Bengali</option>
								</select>
							</div>
						</div>
                            <a href="#" className="primary-btn header-btn text-uppercase mb-20">Transfer Land</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
        );
    }
}

export default TransferLand;
