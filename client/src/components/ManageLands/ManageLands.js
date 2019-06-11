import React, { Component } from "react";
import Header from "../Header/Header";
import { MDBDataTable } from 'mdbreact';

import {Modal, Table, Alert, Row, Col} from "react-bootstrap";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {landManagment}  from "../../actions"
import config from '../../config/accounts';
import ReactJson from 'react-json-view'

const Tx = require('ethereumjs-tx');
class ManageLands extends Component {

    constructor(props){
        super(props);
        this.state = {
          showAddLandsModal:false,
          submitted: false,
          showDetailModal:false,
          myJsonObj1:{
              blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
              blockNumber: null,
              from:"0x72019284f6eF69f9a322193c91185222e80327B4",
              gas:8000000,
              gasPrice:"10000000000",
              hash:"0xc2252d5c82609f4cbf5223aa61ba643697cfda53bbb7e810a3179e79acabb734",
              input:"0xa0d09221000000000000000000000000000000000000000000000000000000000000004000000000000000000000000072019284f6ef69f9a322193c91185222e80327b400000000000000000000000000000000000000000000000000000000000000077364666473616600000000000000000000000000000000000000000000000000",
              nonce:12
          }
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

    toogleDetailModal = () =>{
      this.setState({showDetailModal:!this.state.showDetailModal});
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
           <Table className="white-color" striped bordered hover>
            <thead>
              <tr>
                <th >#</th>
                <th>Landname</th>
                <th>Current Owner</th>
                <th>Created At</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Vastrapur</td>
                <td>Arjun</td>
                <td>11th August,2019</td>
                <td><button onClick={this.toogleDetailModal}>View Details</button></td>
              </tr>
           </tbody>
          </Table>
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
      <Modal size="lg" show={this.state.showDetailModal} onHide={this.toogleDetailModal}>
          <Modal.Header closeButton>
            <Modal.Title>Land Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row className="show-grid">
              <Col xs={12} md={12}>
              <Table  striped bordered hover>
            <thead>
              <tr>
                <th >#</th>
                <th>Landname</th>
                <th>Current Owner</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Vastrapur</td>
                <td>Arjun</td>
                <td>11th August,2019</td>
              </tr>
           </tbody>
          </Table>
              </Col>
              <Col xs={6} md={4}>
              <ReactJson src={this.state.myJsonObj1} />
              </Col>
            </Row>
            <div className="col-lg-6 cols">

            </div>
            <div className="col-lg-6 cols">

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
  createLand:landManagment.createLand,
})(ManageLands));


