import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
        const web3 = new Web3('https://ropsten.infura.io/v3/a2f563467a2348108aa0911ec44fa622')
        resolve(web3);
    })
  });

export default getWeb3;
