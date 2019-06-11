import React, { Component } from "react";
import logo from '../../asserts/img/bitcoin.png';
import Header from'../Header/Header';
import config from '../../config/accounts';
const Tx = require('ethereumjs-tx');


class TransferLand extends Component {


    handleTransferLand = async() => {
        const { web3, contract } = this.props;
        console.log(web3)
        console.log(contract)
         //change the landname and Owner Addres from the Data
         var landId = 0; //***************change this value */
         var fromAddress = "0x72019284f6eF69f9a322193c91185222e80327B4"; //************Change this value */
         var toAddress = "0x939Fe916Eb58d7EeDb58B2942Ca6F2e4aDC2238b"; //************Change this value */

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

               if(txHash){
                 await web3.eth.getTransaction(txHash,(err,data)=>{

                   //here is the data that needs to be saved..
                   console.log(data) /*************send this data to the database */
                 })
               }
             })
           })
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
                        <select className="browser-default custom-select">
                            <option>Choose your option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <div className="single-element-widget mt-30">
							<div className="default-select" id="default-select">
								<select>
									<option value="1">English</option>
									<option value="1">Spanish</option>
									<option value="1">Arabic</option>
									<option value="1">Portuguise</option>
									<option value="1">Bengali</option>
								</select>
							</div>
						</div>
                        <a onClick={this.handleTransferLand} className="primary-btn header-btn text-uppercase mb-20">Transfer Land</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </React.Fragment>
        );
    }
}

export default TransferLand;
