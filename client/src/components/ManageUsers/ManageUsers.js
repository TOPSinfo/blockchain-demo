import React, { Component } from "react";
import Header from "../Header/Header";
import { Alert } from 'react-bootstrap';
import {Modal, Table} from "react-bootstrap";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {landManagment}  from "../../actions"
import './ManageUsers.css';
class ManageUsers extends Component {

    constructor(props){
        super(props);
         this.state = {
            showAddUserModal:false,
            userData:[],
            submitted: false
        }
    }

    componentDidMount = () => {
      this.getAllUsers()
    }

    getAllUsers = () =>{
      var data={
        contract:this.props.contract
      }
      this.props.getAllUsers(data)
    }

    componentWillReceiveProps = (nextProps) =>{

      if(nextProps.landManagment.newUserAdded){
        this.getAllUsers()
      }

      var userData = [];
      var {allAccounts} = nextProps.landManagment;
      allAccounts.then((allAccounts)=>{
        allAccounts[1].map((username,index)=>{
            userData[index] = {}
            userData[index].username = username
        })

        allAccounts[0].map((accountId,index)=>{
           userData[index].address = accountId
       })


       this.setState({userData:userData})
      }).catch((err)=>{
          console.log(err)
      })
    }

    toogleAddUserModal = () => {
      this.setState({showAddUserModal:!this.state.showAddUserModal})
    }

    handleAddUser = () => {
      this.setState({ submitted: true });
      const { username, password } = this.state;
      if(username && password){
        if(username.trim() !== ''){
          var data={
            username:this.state.username.trim(),
            password:this.state.password,
            web3:this.props.web3,
            contract:this.props.contract
          }
          console.log(data)
          // this.props.createUserAccount(data);
          // this.toogleAddUserModal()
           
        }
        
      }
      
      
    }


    handleOnChangeInput = (e) => {
      this.setState({[e.target.id]:e.target.value})
    }
    render() {
      const { username, password, submitted } = this.state;
      console.log("submitted...................",submitted,"username",username)
      // console.log("username.trim().length === 0",username.trim().length === 0)
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
              {this.state.userData.map((user,index)=>{
                if(index !== 0){
                  return(<tr key={index}>
                    <td>{index}</td>
                    <td>{user.username}</td>
                    <td>{user.address}</td>
                  </tr>)
                }
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
              <input type="text" onChange={this.handleOnChangeInput}  id="username" placeholder="Username" className="form-control mb-20"/>
              {
                (submitted && !username) ? 
                  (<Alert variant='warning'>Username is required</Alert>) :

                  (submitted && username.trim().length === 0) ?
                          ( <Alert variant= 'warning'>
                          Warning no leading whitespace
                          </Alert> ) : null
                                          
              }
              <input type="password" onChange={this.handleOnChangeInput} id="password" placeholder="Password" className="form-control mb-20"/>
              {submitted && !password &&
                            <Alert variant= 'warning'>Password is required</Alert>
              }
              <a onClick={this.handleAddUser} className="primary-btn header-btn text-uppercase mb-20 login-button">Submit</a>
            </div>

          </Modal.Body>
        </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ landManagment }) {
  return {
    landManagment
  }
}

export default  withRouter ( connect(mapStateToProps,{
  createUserAccount:landManagment.createUserAccount,
  getAllUsers:landManagment.getAllUsers
})(ManageUsers));


