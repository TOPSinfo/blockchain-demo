import React, { Component } from "react";
import Header from "../Header/Header";
import { MDBDataTable } from 'mdbreact';

import {Modal, Table, Alert} from "react-bootstrap";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {landManagment}  from "../../actions"
import config from '../../config/accounts';
const Tx = require('ethereumjs-tx');
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
    handleAddLand = async () =>{
      this.setState({ submitted: true });
      const { landName } = this.state;
      if(landName){
        if(landName.trim() !== ''){
            var data={
              landName:this.state.landName,
              web3:this.props.web3,
              contract:this.props.contract
            }

        //blockchain part starts from here
        var {web3,contract} = this.props;
        //change the landname and Owner Addres from the Data
        var land = "Sakar-5"; //***************change this value */
        var ownerAddress = "0x72019284f6eF69f9a322193c91185222e80327B4"; //************Change this value */

        await web3.eth.getTransactionCount(config()[0].address, async (err, txCount) => {

            const txObject = {
              nonce:    web3.utils.toHex(txCount),
              gasLimit: web3.utils.toHex(8000000), // Raise the gas limit to a much higher amount
              gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
              to: config()[0].contractAddress,
              data: contract.methods.createLand(landName,ownerAddress).encodeABI()
            }

            const tx = new Tx(txObject)
            tx.sign(Buffer.from(config()[0].privateKey, 'hex'))

            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex')

            await web3.eth.sendSignedTransaction(raw, async (err, txHash) => {
              console.log('err:', err, 'txHash:', txHash)

              if(txHash){
                await web3.eth.getTransaction(txHash,(err,data)=>{

                  //here is the data that needs to be saved..
                  console.log(data) /*************send this data to the database */
                })
              }
            })
          })
        //blockchain part ends from here

            this.toogleAddLandModal()
      }


















        }



    }
    render() {
      const {isAuthenticated }=this.props.auth
      const { landName, submitted} = this.state;
        return (
          
          <React.Fragment>
            
                { (isAuthenticated && this.props.auth.user.isAdmin) ?
                (
                  <React.Fragment>
                    <Header/>
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
          </Table> */}
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
        </React.Fragment>):
        (
          <React.Fragment>
            <Header/>
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
                    <h1 className="text-white">View Lands</h1>
                    <p className="text-white">Here you can view the Lands owned by you.</p>
                  
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
          </Table> */}
            </div>
        </div>
    </section>
    
        </React.Fragment>
        )}
         </React.Fragment>       
        );
    }
}



const mapStateToProps = state => ({
  auth: state.auth,
  landManagment
});

export default  withRouter ( connect(mapStateToProps,{
  createLand:landManagment.createLand,
})(ManageLands));


