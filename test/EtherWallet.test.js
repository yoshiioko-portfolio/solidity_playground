const { expectRevert } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const { expect } = require("chai");

const EtherWallet = artifacts.require("EtherWallet");

contract("EtherWallet", function (accounts) {
  const [owner, nonOwner] = accounts;

  beforeEach(async function () {
    this.contract = await EtherWallet.new();
  });

  //   it("Random stuff here", async function () {
  //     // const expected = web3.utils.toBN("123.052");
  //     // const actual = await meta.getBalance.call(account_two);
  //     // expect(actual).to.eql(expected);

  //     let send_value = web3.utils.toWei("5", "ether");
  //     await this.contract.send(send_value, { from: nonOwner });

  //     let balance = await this.contract.getBalance();
  //     console.log(balance.toString());

  //     await this.contract.withdraw(send_value);
  //     balance = await this.contract.getBalance();
  //     console.log(balance.toString());

  //     let ownerBalance = await web3.eth.getBalance(owner);
  //     console.log(ownerBalance.toString());
  //   });

  it("Test that contract can receive 10 Ether", async function () {
    let send_value = web3.utils.toWei("10", "ether");
    await this.contract.send(send_value, { from: nonOwner });
    let contractBalance = await this.contract.getBalance();

    let expected = web3.utils.toBN(send_value);
    expect(contractBalance.toString()).to.equal(expected.toString());
  });
});
