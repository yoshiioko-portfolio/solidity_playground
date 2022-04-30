const { expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const MyContractV2 = artifacts.require("MyContractV2");

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const INCREMENTER_ROLE = web3.utils.soliditySha3("INCREMENTER_ROLE");
const DECREMENTER_ROLE = web3.utils.soliditySha3("DECREMENTER_ROLE");

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

  it("Default_Admin grants Decrementer role to the Incrementer so they can increment() and decrement()", async function () {
    await this.contract.grantRole(DECREMENTER_ROLE, incrementer);
    await this.contract.increment({ from: incrementer });
    await this.contract.decrement({ from: incrementer });
    let count = await this.contract.getCount();

    expect(count.toString()).to.equal("0");
  });

  it("Default_Admin grants Incrementer role to the Decrementer so they can increment and decrement()", async function () {
    await this.contract.grantRole(INCREMENTER_ROLE, decrementer);
    await this.contract.increment({ from: decrementer });
    await this.contract.decrement({ from: decrementer });
    let count = await this.contract.getCount();

    expect(count.toString()).to.equal("0");
  });
});
