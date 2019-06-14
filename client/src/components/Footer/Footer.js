import React, { Component } from "react";
class Footer extends Component {
    render() {
        return (
            <footer className="footer-area section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h4 className="text-white">About Us</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.
                            </p>
                            </div>
                        </div>
                        <div className="col-lg-4  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h4 className="text-white">Contact Us</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.
                            </p>
                                <p className="number">
                                    012-6532-568-9746 <br />
                                    012-6532-569-9748
                            </p>
                            </div>
                        </div>
                        <div className="col-lg-5  col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h4 className="text-white">Newsletter</h4>
                                <p>You can trust us. we only send  offers, not a single spam.</p>
                                <div className="d-flex flex-row" id="mc_embed_signup">
                                    {/* <form className="navbar-form" novalidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get">
                                    <div className="input-group add-on">
                                        <input className="form-control" name="EMAIL" placeholder="Email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email address'" required="" type="email"/>
                                        <div style="position: absolute; left: -5000px;">
                                            <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text"/>
                                        </div>
                                    <div className="input-group-btn">
                                        <button className="genric-btn primary circle arrow"><span className="lnr lnr-arrow-right"></span></button>
                                    </div>
                                    </div>
                                    <div className="info mt-20"></div>									    
                                </form> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
                        <p className="footer-text m-0">
                            Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                        </p>
                        <div className="footer-social d-flex align-items-center">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-dribbble"></i></a>
                            <a href="#"><i className="fa fa-behance"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;


