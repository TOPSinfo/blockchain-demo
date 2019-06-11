import React, { Component } from "react";
import Header from "../Header/Header";
import { Alert } from 'react-bootstrap';
import {Modal, Table} from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import {landManagment,getUsers, loginUser}  from "../../actions"
import './ManageUsers.css';
class ManageUsers extends Component {

    constructor(props){
        super(props);
         this.state = {
            showAddUserModal:false,
            userData:[],
            submitted: false,
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
    }

    componentDidMount = () => {
      this.getUsers()
      // if (this.props.auth.isAuthenticated) {
      //   this.props.history.push("/");
      // }
    }


    getUsers = () =>{
      // var data={
      //   contract:this.props.contract
      // }
      this.props.getUsers();
      if(this.props.Users){
        this.setState({
          userData:this.props.Users.allAccounts      
        })  
      }
    }

    componentWillReceiveProps = (nextProps) =>{
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
      // allAccounts.map((users,index)=>{
      // console.log("users..................",users)
      // })
      // allAccounts.then((allAccounts)=>{
      //   allAccounts[1].map((username,index)=>{
      //       userData[index] = {}
      //       userData[index].username = username
      //   })

      //   allAccounts[0].map((accountId,index)=>{
      //      userData[index].address = accountId
      //  })
      //  this.setState({userData:userData})
      // }).catch((err)=>{
      //     console.log(err)
      // })
    }

    toogleAddUserModal = () => {
      this.setState({showAddUserModal:!this.state.showAddUserModal})
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
        password2: this.state.password2,
        web3 :this.props.web3,
        contract:this.props.contract
      };
  
     
  
      this.props.registerUser(newUser, this.props.history);
      this.toogleAddUserModal()
    };

    render() {
      const { errors } = this.state;
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
                    <h1 className="text-white">Manage Users</h1>
                    <p className="text-white">Here you can create and manage the users of the blockchain.</p>
                    <a onClick={this.toogleAddUserModal} className="primary-btn header-btn text-uppercase mb-20">Add User</a>
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
              {this.state.userData && this.state.userData.map((user,index)=>{
                
                  return(<tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user._id}</td>
                  </tr>)
                
              })}
            </tbody>
          </Table>

         </div>
        </div>
    </section>


    <Modal show={this.state.showAddUserModal} onHide={this.toogleAddUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-lg-6 cols">
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
                                </form>
            </div>

          </Modal.Body>
        </Modal>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default  withRouter ( connect(mapStateToProps,{
  registerUser:loginUser.registerUser,
  getUsers:getUsers.getAllUser
})(ManageUsers));


