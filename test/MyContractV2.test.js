const { expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const MyContractV2 = artifacts.require("MyContractV2");

contract("MyContractV2", function (accounts) {
  const [owner, incrementer, decrementer] = accounts;

  beforeEach(async function () {
    this.contract = await MyContractV2.new(incrementer, decrementer, {
      from: owner,
    });
  });

  it("Incrementer role increment once", async function () {
    await this.contract.increment({ from: incrementer });
    let count = await this.contract.getCount();

    expect(count.toString()).to.equal("1");
  });

  it("Decrementer role decrement once", async function () {
    await expectRevert(
      this.contract.decrement({ from: decrementer }),
      "Unable to decrement zero value!"
    );
  });

  it("Default_Admin reset the counter to Zero", async function () {
    this.contract.resetCount();
    let count = await this.contract.getCount();

    expect(count.toString()).to.equal("0");
  });
});
