const Migrations = artifacts.require("Stack");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
