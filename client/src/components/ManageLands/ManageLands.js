import React, { Component } from "react";
import Header from "../Header/Header";
import { MDBDataTable } from 'mdbreact';

import { Modal, Table, Alert, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { landManagment } from "../../actions"
import config from '../../config/accounts';
import ReactJson from 'react-json-view'
import Loader from "../Loader/Loader"
import Moment from 'react-moment';
import './ManageLands.css';

const Tx = require('ethereumjs-tx');
class ManageLands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddLandsModal: false,
      submitted: false,
      showDetailModal: false,
      lands: [],
      history: [],
      transctionError: { message: "" }
    }
  }

  componentDidMount = () => {
    this.getLands();
  }

  getLands = () => {
    if (this.props.auth.user.isAdmin) {
      this.props.getAllLands()
    } else {
      this.props.getAllLandsByOwner({ currentOwner: this.props.auth.user.name })
    }
  }
  toogleAddLandModal = () => {
    this.setState({ transctionError: { message: "" } })
    this.setState({ showAddLandsModal: !this.state.showAddLandsModal })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.landManagment.landCreated) {
      this.getLands();
      this.setState({ isTransctionInProcess: false });
    }
    if (nextProps.landManagment.lands.land.length) {
      this.setState({ lands: nextProps.landManagment.lands.land })
    }

  }
  handleOnChangeInput = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }
  handleAddLand = async () => {
    this.setState({ submitted: true });

    const { landName } = this.state;
    if (landName) {
      if (landName.trim() !== '') {
        this.setState({ isTransctionInProcess: true });
        //blockchain part starts from here
        var { web3, contract } = this.props;


        web3.eth.getBlock(
          "pending",
          function (error, block) {
            if (error) {
              console.error(error);
            } else {
              console.log(block)
              console.log(block.transactions);
            }
          });
        //change the landname and Owner Addres from the Data
        var land = this.state.landName;
        console.log("this.props.auth", this.props.auth)
        var ownerAddress = this.props.auth.user.address;

        await web3.eth.getTransactionCount(config()[0].address, async (err, txCount) => {

          const txObject = {
            nonce: web3.utils.toHex(txCount),
                                      //  6721975
            gasLimit: web3.utils.toHex(3000000), // Raise the gas limit to a much higher amount
            gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
            to: config()[0].contractAddress,
            data: contract.methods.createLand(land, ownerAddress).encodeABI()
          }
          console.log("txObject", txObject)
          const tx = new Tx(txObject)
          tx.sign(Buffer.from(config()[0].privateKey, 'hex'))

          const serializedTx = tx.serialize()
          const raw = '0x' + serializedTx.toString('hex')

          await web3.eth.sendSignedTransaction(raw, async (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)

            if (err === false) {
              this.setState({ txHash: txHash, transctionSuccess: true })
            } else {
              this.setState({ transctionSuccess: false, transctionError: err })
              this.setState({ isTransctionInProcess: false });
            }
            if (txHash) {
              await web3.eth.getTransaction(txHash, (err, data) => {
                //here is the data that needs to be saved..
                var createLandData = {
                  landName: land,
                  currentOwner: this.props.auth.user.name,
                  OwnerAddress: this.props.auth.user.address,
                  username: this.props.auth.user.name,
                  reciept: data
                }
                this.props.createLand(createLandData);
                this.toogleAddLandModal()
              })
            }
          })
        })
        //blockchain part ends from here
      }
    }
  }

  toogleDetailModal = (e, index) => {

    if (typeof index !== undefined) {
      this.setState({ history: this.state.lands[index].history })
    }
    this.setState({ showDetailModal: !this.state.showDetailModal });
  }
  render() {
    const { landName, submitted } = this.state;
    console.log("this.state.transctionError", this.state.transctionError)
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

                <a href="#" className="primary-btn header-btn text-uppercase">Buy Bitcoin</a>
              </div>
            </div>
          </div>
        </section>
        <section className="convert-area bg" id="convert">
          <div className="container">
            <div className="convert-wrap">
              <div className="row justify-content-center align-items-center flex-column pb-30">

                {(this.props.auth.user.isAdmin) ?
                  (<><h1 className="text-white">View and Create New Lands</h1>
                    <p className="text-white">Here you can Create new Lands, and Manage the Lands owned by you.</p>
                    <a onClick={this.toogleAddLandModal} className="primary-btn header-btn text-uppercase mb-20">Add Land</a></>
                  ) :
                  (
                    <><h1 className="text-white">View Lands</h1>
                      <p className="text-white">Here you can view Lands owned by you.</p>
                    </>
                  )
                }

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
                  {this.state.lands.map((land, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{land.landName}</td>
                        <td>{land.currentOwner}</td>
                        <td>
                          <Moment format="HH:mm DD/MM/YYYY">
                            {land.history[0].Timestamp}
                          </Moment>
                        </td>
                        <td className="detail-button" onClick={(e) => this.toogleDetailModal(e, index)}>View Details</td>
                      </tr>
                    )
                  })}
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
            <Row className="show-grid">

              <Col xs={12} md={12}>
                <input type="text" onChange={this.handleOnChangeInput} id="landName" placeholder="Land Name" className={`form-control ${(submitted && !landName) || (submitted && landName.trim().length === 0) ? 'add-border-color' : ''}`} />
              </Col>
              <Col xs={12} md={12}>
                {
                  (submitted && !landName) ?
                    (<span className="add-span">Land name is required.</span>) :

                    (submitted && landName.trim().length === 0) ?
                      (<span className="add-span">Warning no leading whitespace</span>) : null

                }
              </Col>
              <Col xs={12} md={12}>
                {this.state.isTransctionInProcess ? <div className="add-land-loader"><Loader /></div> :
                  <a onClick={this.handleAddLand} className="primary-btn header-btn text-uppercase mb-20 add-land">Add Land</a>
                }
                <br></br>
                {
                  this.state.transctionSuccess ?
                    <a className="common-word-break" target="blank" href={"https://ropsten.etherscan.io/tx/" + this.state.txHash}>Transction Successful..!! <br></br>{this.state.txHash}</a>
                    :
                    <span className="clr-red">{this.state.transctionError && this.state.transctionError.message}</span>
                }
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={this.state.showDetailModal} onHide={(e) => this.toogleDetailModal(e, 0)}>
          <Modal.Header closeButton>
            <Modal.Title>Land Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="show-grid">
              <Col xs={12} md={12}>

                {this.state.history.map((history, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th >#</th>
                            <th>Owner Name</th>

                            <th>Transferred At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{history.username}</td>

                            <td>
                              <Moment format="HH:mm DD/MM/YYYY">
                                {history.Timestamp}
                              </Moment>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="land-detial-break-all">
                        <ReactJson collapsed={true} collapseStringsAfterLength={65} src={history.reciept} />
                      </div>
                    </React.Fragment>
                  )
                })}



              </Col>
            </Row>
          </Modal.Body>
        </Modal>

      </React.Fragment>
    );
  }
}

function mapStateToProps({ landManagment, auth }) {
  return {
    landManagment, auth
  }
}

export default withRouter(connect(mapStateToProps, {
  createLand: landManagment.createLand,
  getAllLands: landManagment.getAllLands,
  getAllLandsByOwner: landManagment.getAllLandsByOwner
})(ManageLands));


