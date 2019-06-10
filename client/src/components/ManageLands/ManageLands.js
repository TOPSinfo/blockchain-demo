import React, { Component } from "react";
import Header from "../Header/Header";
import { MDBDataTable } from 'mdbreact';

import {Modal, Table, Alert} from "react-bootstrap";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {landManagment}  from "../../actions"

class ManageLands extends Component {

    constructor(props){
        super(props);
        this.state = {
          showAddLandsModal:false,
          submitted: false
        }
    }

    toogleAddLandModal = () => {
      this.setState({showAddLandsModal:!this.state.showAddLandsModal})
    }

    handleOnChangeInput = (e) => {
      this.setState({[e.target.id]:e.target.value})
    }
    handleAddLand = () =>{
      this.setState({ submitted: true });
      const { landName } = this.state;
      if(landName){
        if(landName.trim() !== ''){
            var data={
              landName:this.state.landName,
              web3:this.props.web3,
              contract:this.props.contract
            }
            // this.props.createLand(data);
               this.toogleAddLandModal()
          }
        }
      
      

    }
    render() {
      const { landName, submitted} = this.state; 
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
                    <h1 className="text-white">View and Create New Lands</h1>
                    <p className="text-white">Here you can Create new Lands, and Manage the Lands owned by you.</p>
                    <a onClick={this.toogleAddLandModal} className="primary-btn header-btn text-uppercase mb-20">Add Land</a>
                </div>
            {/* <Table className="white-color" striped bordered hover>
            <thead>
              <tr>
                <th >#</th>
                <th>Username</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.userData.map((user,index)=>{
                if(index !== 0){
                  return(<tr key={index}>
                    <td>{index}</td>
                    <td>{user.username}</td>
                    <td>{user.address}</td>
                  </tr>)
                }
              })} */}
            {/* </tbody>
          </Table> */} */}
            </div>
        </div>
    </section>
    <Modal show={this.state.showAddLandsModal} onHide={this.toogleAddLandModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Land</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-lg-6 cols">
              <input type="text" onChange={this.handleOnChangeInput}  id="landName" placeholder="Land Name" className="form-control mb-20"/>
              {
                (submitted && !landName) ? 
                  (<Alert variant='warning'>Landname is required</Alert>) :

                  (submitted && landName.trim().length === 0) ?
                          ( <Alert variant= 'warning'>Warning no leading whitespace</Alert> ) : null
                                          
              }              
              <a onClick={this.handleAddLand} className="primary-btn header-btn text-uppercase mb-20 login-button">Submit</a>
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
  getAllLand:landManagment.getAllLand
})(ManageLands));


