import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser }  from "../../actions/index";
import logo from '../../asserts/img/bitcoin.png';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
                                <h1 className="text-white">Register</h1>
                            </div>
                            <div className="row justify-content-center align-items-start">
                                <div className="col-lg-2 cols-img">
                                    <img className="d-block mx-auto" src={logo} alt=""/>
                                </div>
                                <div className="col-lg-4 cols">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" type="text" placeholder="Username" className="form-control mb-20"/>
                                    <span className="red-text">{errors.name}</span>
                                    <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email"type="text" placeholder="Email" className="form-control mb-20"/>
                                    <span className="red-text">{errors.email}</span>
                                    <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" placeholder="Password" className="form-control mb-20"/>
                                    <span className="red-text">{errors.password}</span>
                                    <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" placeholder="Confirm Password" className="form-control mb-20"/>
                                    <span className="red-text">{errors.password2}</span>
                                    <button type='submit' className="primary-btn header-btn text-uppercase mb-20 login-button">Register</button>
                                    <p className="grey-text text-darken-1">
                                     Already have an account? <Link to="/login">Log in</Link>
                                    </p>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
     
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser:loginUser.registerUser }
)(withRouter(Register));
