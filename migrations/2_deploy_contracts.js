var LandManagment = artifacts.require("./LandManagment.sol");

module.exports = function(deployer) {
  deployer.deploy(LandManagment);
};
