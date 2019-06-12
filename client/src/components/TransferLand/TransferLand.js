import React, { Component } from "react";
import logo from '../../asserts/img/bitcoin.png';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Header from'../Header/Header';
import config from '../../config/accounts';
import {users,landManagment}  from "../../actions"
import './TransferLand.css';
import Loader from '../Loader/Loader';
const Tx = require('ethereumjs-tx');


class TransferLand extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            lands:[],
            errors:{},
            isTransctionInProcess:false,
            transctionError:{message:""}
        }
    }

    componentDidMount = () =>{
        this.props.getAllUser();
        this.props.getAllLandsByOwner({currentOwner:this.props.auth.user.name})
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.users.allAccounts.length){
            this.setState({users:nextProps.users.allAccounts})
        }
        if(nextProps.landManagment.lands.land.length > 0){
            this.setState({lands:nextProps.landManagment.lands.land})
        }else{
            this.setState({lands:[]})
        }
        if(nextProps.landManagment.landTransfered){
            this.setState({isTransctionInProcess:false});
            this.props.getAllLandsByOwner({currentOwner:this.props.auth.user.name})
        }
    }

    handleTransferLand = async() => {
        if(this.validate()){
            this.setState({isTransctionInProcess:true})
            const { web3, contract } = this.props;

             //change the landname and Owner Addres from the Data
             var landId = parseInt(this.state.land); //***************change this value */
             var fromAddress = this.props.auth.user.address; //************Change this value */
             var toAddress = this.state.transferTo; //************Change this value */


             await web3.eth.getTransactionCount(config()[0].address, async (err, txCount) => {

                 const txObject = {
                   nonce:    web3.utils.toHex(txCount),
                   gasLimit: web3.utils.toHex(8000000), // Raise the gas limit to a much higher amount
                   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                   to: config()[0].contractAddress,
                   data: contract.methods.transferLand(fromAddress,toAddress,landId).encodeABI()
                 }

                 const tx = new Tx(txObject)
                 tx.sign(Buffer.from(config()[0].privateKey, 'hex'))

                 const serializedTx = tx.serialize()
                 const raw = '0x' + serializedTx.toString('hex')

                 await web3.eth.sendSignedTransaction(raw, async (err, txHash) => {
                   console.log('err:', err, 'txHash:', txHash)

                   if(err === false){
                       this.setState({txHash:txHash,transctionSuccess:true})
                   }else{
                       this.setState({transctionSuccess:false, transctionError:err})
                       this.setState({isTransctionInProcess:false});
                   }

                   if(txHash){
                     await web3.eth.getTransaction(txHash,async(err,data)=>{
                       //here is the data that needs to be saved..
                       console.log(data);
                        this.state.users.map((user)=>{
                            if(user.address === toAddress){

                                var transferData = {
                                    landId,
                                    reciept:data,
                                    ownerAddress:toAddress,
                                    username:user.name
                                }
                                //calling action and sending data from here

                                this.props.transferLand(transferData);
                            }
                        })
                     })
                   }
                 })
               })
        }
    }

    validate = () => {

            if(typeof this.state.transferTo === "undefined" || this.state.transferTo === 'null'){
                var errors = {...this.state.errors,transfer:"Please select username-address."}
                this.setState({errors})
                return false;
            }
            else if(typeof this.state.land === "undefined" || this.state.land === 'null'){
                var errors = {...this.state.errors,land:"Please select land."}
                this.setState({errors})
                return false;
            }
            return true

    }

    handleOnTransferChange = (e) =>{
        if(e.target.value === null || typeof e.target.value === 'undefined'|| e.target.value === 'null'){
            var errors = {...this.state.errors,transfer:"Please select username-address."}
            this.setState({errors})
        }else{
            var errors = {...this.state.errors,transfer:""}
            this.setState({errors})
        }
        this.setState({"transferTo":e.target.value})
    }

    handleOnLandChange = (e) =>{
        if(e.target.value === null || typeof e.target.value === 'undefined'|| e.target.value === 'null'){
            var errors = {...this.state.errors,land:"Please select land."}
            this.setState({errors})
        }else{
            var errors = {...this.state.errors,land:""}
            this.setState({errors})
        }
        this.setState({"land":e.target.value})
    }


    render() {
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
                    <h1 className="text-white">Tansfer Land</h1>
                    <p className="text-white">You can transfer land owned by you to any of the member of blockchain.</p>
                </div>
                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-2 cols-img">
                        <img className="d-block mx-auto" src={logo} alt=""/>
                    </div>
                    <div className="col-lg-6 cols">
                        {/* <input type="text" name="feet" placeholder="Username" className="form-control mb-20"/> */}
                        <select defaultValue="null" value={this.state.transferTo} onChange={(e) => this.handleOnTransferChange(e)} id="transferTo" className="browser-default custom-select">
                            <option value="null">Transfer To</option>
                            {this.state.users.map((user,index)=>{
                                return(
                                    <option key={index} value={user.address}>{user.name} - {user.address}</option>
                                )
                            })}
                        </select>
                        <span className="error">{this.state.errors.transfer}</span>
                        <br></br>
                        <select defaultValue="null" onChange={(e) => this.handleOnLandChange(e)} id="landId" className="browser-default custom-select second-input">
                            <option value="null">Select Land</option>
                            {this.state.lands.map((land,index)=>{
                                return(
                                    <option key={index} value={land.landId}>{land.landName}</option>
                                )
                            })}
                        </select>
                        <span className="error">{this.state.errors.land}</span>
                        {this.state.isTransctionInProcess ? <Loader />:
                            <a onClick={this.handleTransferLand} className="primary-btn header-btn text-uppercase mb-20 transfer-btn">Transfer Land</a>
                        }
                        <br></br>
                        {
                            this.state.transctionSuccess ?
                            <a target="blank" href={"https://ropsten.etherscan.io/tx/"+this.state.txHash}>Transction Successful..!! {this.state.txHash}</a>
                            :
                            <span className="error">{this.state.transctionError.message}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
        );
    }
}

function mapStateToProps({ landManagment,auth,users}) {
    return {
      landManagment,
      users,
      auth
    }
  }

  export default  withRouter (connect(mapStateToProps,{
    getAllUser:users.getAllUser,
    getAllLandsByOwner:landManagment.getAllLandsByOwner,
    transferLand:landManagment.transferLand
  })(TransferLand));

