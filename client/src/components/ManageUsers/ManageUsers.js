import React, { Component } from "react";
import Header from "../Header/Header";
import { Modal, Table, Alert, Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { landManagment, users, loginUser } from "../../actions"
import './ManageUsers.css';




const validEmailRegex =
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class ManageUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddUserModal: false,
      userData: [],
      submitted: false,
      errors: {
        fullName: '',
        email: '',
        password: '',
      }
    }
  }

  componentDidMount = () => {
    this.props.getAllUser();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ userData: nextProps.users.allAccounts })
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [event.target.name]: event.target.value });
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          this.validEmailRegex.test(value)
            ? ''
            : value.length === 0 ? 'Email is required' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : value.length === 0 ? 'Password is required' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }

  toogleAddUserModal() {
    this.setState({
      showAddUserModal: !this.state.showAddUserModal
    })
  }

  handleShow = () =>   {
    this.setState({
      showAddUserModal: true,
      submitted: false,
      formSuccess: false,
      fullName: '',
      email: '',
      password: '',
      password2: '',
      errors: {
        fullName: '',
        email: '',
        password: '',
      }
    });
  };

  handleHide = () => {
    this.setState({
      showAddUserModal: false,
      clearError: true,
      submitted: false
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submitted: true,
      clearError: false
    })
    if (this.validateForm(this.state.errors)) {
      const { fullName, email, password, password2 } = this.state;
      if (fullName && email) {
        if (fullName.trim().length > 0 && email && password === password2) {
          const newUser = {
            name: this.state.fullName.trim(),
            email: this.state.email.trim(),
            password: this.state.password,
            password2: this.state.password2,
            web3: this.props.web3,
            contract: this.props.contract
          };

          this.props.registerUser(newUser, this.props.history);
          this.toogleAddUserModal();
        }
      }

    } else {

    }
  }



  render() {
    const { errors, fullName, email, submitted, password, password2 } = this.state;
    console.log("ERRRRRRRR..............",errors)
    return (
      <React.Fragment>
        <Header />

        <section className="banner-area relative" id="home">
          <div className="overlay overlay-bg"></div>
          <div className="container">
            <div className="row fullscreen d-flex align-items-center justify-content-start">
              <div className="banner-content col-lg-12 col-md-12">
                <h1 className="text-uppercase">
                  &nbsp;
                            </h1>
                <p className="text-white pt-20 pb-20">
                  &nbsp;
                            </p>

              </div>
            </div>
          </div>
        </section>
        <section className="convert-area bg" id="convert">
          <div className="container">
            <div className="convert-wrap">
              <div className="row justify-content-center align-items-center flex-column pb-30">
                <h1 className="text-white">Manage Users</h1>
                <p className="text-white">Here you can create and manage the users of the blockchain.</p>
                <a onClick={this.handleShow} className="primary-btn header-btn text-uppercase mb-20 ">Add User</a>
              </div>
              <Table className="white-color" striped bordered hover>
                <thead>
                  <tr>
                    <th >#</th>
                    <th>Username</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.userData && this.state.userData.map((user, index) => {

                      return (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.address}</td>
                      </tr>)

                    })}
                </tbody>
              </Table>

            </div>
          </div>
        </section>


        <Modal show={this.state.showAddUserModal} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container>
                        <Row className="justify-content-center">
              
              <form noValidate onSubmit={this.handleSubmit}>

                <Col xs={12} md={12}>
                  <input onChange={this.handleChange} name="fullName" value={this.state.name} placeholder="Username" className={`form-control mb-05 ${errors.fullName || (submitted && !fullName) ? 'add-border-color' : ''}`} />
                </Col>
                <Col xs={12} md={12}>
                  {errors.fullName.length > 0 &&
                    <span className="add-span">{errors.fullName}</span>
                  }
                  {
                    (submitted && !fullName) &&
                    <div className="add-span">Name is reqiured</div>
                  }
                  {
                    (submitted && fullName && fullName.trim().length === 0) &&
                    <div className="add-span">Avoid Space </div>
                  }
                </Col>
                <Col xs={12} md={12}>
                  <input onChange={this.handleChange} name="email" type="email" value={this.state.email} placeholder="Email" className={`form-control mb-05 ${errors.email || (submitted && !email)? 'add-border-color' : ''}`} />
                </Col>
                <Col xs={12} md={12}>
                  {errors.email.length > 0 &&
                    <div className="add-span">{errors.email}</div>}
                  {
                    (submitted && !email) &&
                    <div className="add-span">Email is required!</div>
                  }
                  {
                    (submitted && email && email.trim().length === 0) &&
                    <div className="add-span" >Avoid Space </div>
                  }
                </Col>
                <Col xs={12} md={12}>
                  <input onChange={this.handleChange} name="password" type="password" value={this.state.password} placeholder="Password" className={`form-control mb-05 ${errors.password || (submitted && !password)? 'add-border-color' : ''}`} />
                </Col>
                <Col xs={12} md={12}>
                  {errors.password.length > 0 &&
                    <div className="add-span">{errors.password}</div>}
                  {
                    (submitted && !password) &&
                    <div className="add-span"> Password is required!</div>
                  }
                </Col>
                <Col xs={12} md={12}>
                  <input onChange={this.handleChange} value={this.state.password2} name="password2" type="password" placeholder="Confirm Password" className={`form-control mb-05 ${(submitted &&!password2) || (submitted && (password !== password2))? 'add-border-color' : ''}`} />
                </Col>
                <Col xs={12} md={12}>
                  {
                    (submitted && !password2) &&
                    <div className="add-span">Confirm password is required!</div>
                  }
                  {
                    (submitted && password !== password2) && password2 &&
                    <div className="add-span" >Password and Confirm Password does not match !</div>
                  }
                </Col>
                <button type='submit' className="primary-btn header-btn text-uppercase mb-05 login-button add-land1">Add</button>
              </form>
              
            </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}


function mapStateToProps({ auth, users }) {
  return {
    auth: auth,
    users
  }
}


export default withRouter(connect(mapStateToProps, {
  getAllUser: users.getAllUser,
  registerUser: users.registerUser
})(ManageUsers));


