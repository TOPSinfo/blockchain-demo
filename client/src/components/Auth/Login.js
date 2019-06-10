import React, { Component } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/index";
import classnames from "classnames";
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import {auth}  from "../../actions"
import './login.css';
import logo from '../../asserts/img/bitcoin.png';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
       this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
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
            <section className="convert-area bg" id="convert">
        <div className="container">
            <div className="convert-wrap">
                <div className="row justify-content-center align-items-center flex-column pb-30">
                    <h1 className="text-white">Login</h1>
                </div>
                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-2 cols-img">
                        <img className="d-block mx-auto" src={logo} alt=""/>
                    </div>
                    <div className="col-lg-4 cols">
                    <form noValidate onSubmit={this.onSubmit}>
                        <input onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email" 
                          placeholder = "Email"
                          className="form-control mb-20"/>
                          <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                          </span>
                        <input  onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password" 
                          placeholder= "password"
                          className="form-control mb-20"/>
                          <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                          </span>
                        <button type= "submit" className="primary-btn header-btn text-uppercase mb-20 login-button">Login</button>
                        <p className="black-text text-darken-1">
                          Don't have an account?
                            <Link to="/register">register</Link>
                        </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
    //   <React.Fragment>
    //         <section className="banner-area relative" id="home">
    //             <div className="overlay overlay-bg"></div>
    //             <div className="container">
    //                 <div className="row fullscreen d-flex align-items-center justify-content-start">
    //                     <div className="banner-content col-lg-12 col-md-12">
    //                         {/* <h5 className="text-white text-uppercase"></h5> */}
    //                         <h1 className="text-uppercase">
    //                             &nbsp;
    //                         </h1>
    //                         <p className="text-white pt-20 pb-20">
    //                             &nbsp;
    //                         </p>
    //                         {/* <a href="#" className="primary-btn header-btn text-uppercase">Buy Bitcoin</a> */}
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //         <section className="convert-area bg" id="convert">
    //     <div className="container">
    //         <div className="convert-wrap">
    //             <div className="row justify-content-center align-items-center flex-column pb-30">
    //                 <h1 className="text-white">Login</h1>
    //             </div>
    //             <div className="row justify-content-center align-items-start">
    //                 <div className="col-lg-2 cols-img">
    //                     <img className="d-block mx-auto" src={logo} alt=""/>
    //                 </div>
    //                 <div className="col-lg-4 cols">
    //                 <div className="container">
    //     <div style={{ marginTop: "4rem" }} className="row">
    //       <div className="col s8 offset-s2">
    //         <Link to="/" className="btn-flat waves-effect">
    //           <i className="material-icons left">keyboard_backspace</i> Back to
    //           home
    //         </Link>
    //         <form noValidate onSubmit={this.onSubmit}>
    //           <div className="input-field col s12">
    //           <label htmlFor="email">Email</label>
    //             <input
    //               onChange={this.onChange}
    //               value={this.state.email}
    //               error={errors.email}
    //               id="email"
    //               type="email"
    //               className={classnames("", {
    //                 invalid: errors.email || errors.emailnotfound
    //               })}
    //             />
                
    //             <span className="red-text">
    //               {errors.email}
    //               {errors.emailnotfound}
    //             </span>
    //           </div>
    //           <div className="input-field col s12">
    //           <label htmlFor="password">Password</label>
    //             <input
    //               onChange={this.onChange}
    //               value={this.state.password}
    //               error={errors.password}
    //               id="password"
    //               type="password"
    //               className={classnames("", {
    //                 invalid: errors.password || errors.passwordincorrect
    //               })}
    //             />
    //             <span className="red-text">
    //               {errors.password}
    //               {errors.passwordincorrect}
    //             </span>
    //           </div>
    //           <div className="col s12" style={{ paddingLeft: "11.250px" }}>
    //             <button
    //               style={{
    //                 width: "150px",
    //                 borderRadius: "3px",
    //                 letterSpacing: "1.5px",
    //                 marginTop: "1rem"
    //               }}
    //               type="submit"
    //               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
    //             >
    //               Login
    //             </button>
    //           </div>
    //           <div className="col s12" style={{ paddingLeft: "11.250px" }}>
    //           <p className="grey-text text-darken-1">
    //             Don't have an account?
    //              <Link to="/register">register</Link>
    //           </p>
    //         </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>
    //     </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser:loginUser.loginUser }
)(withRouter(Login));
