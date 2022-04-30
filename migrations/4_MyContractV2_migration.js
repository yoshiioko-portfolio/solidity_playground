const MyContractV2 = artifacts.require("MyContractV2");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(MyContractV2, accounts[1], accounts[2]);
};
