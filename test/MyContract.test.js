// Load dependencies
const { expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

// Load compiled artifacts
const MyContract = artifacts.require("MyContract");

// Start test block
contract("MyContract", function (accounts) {
  const [owner, other] = accounts;

  beforeEach(async function () {
    // Deploy the contract for each test
    this.contract = await MyContract.new({ from: owner });
  });

  it("Test initial count", async function () {
    let init_count = await this.contract.getCount();
    expect(init_count.toString()).to.equal("0");
  });

  it("Owner increment the count twice", async function () {
    await this.contract.increment();
    await this.contract.increment();

    let curr_count = await this.contract.getCount();
    expect(curr_count.toString()).to.equal("2");
  });

  it("Owner increment and decrement the count twice", async function () {
    await this.contract.increment();
    await this.contract.increment();
    await this.contract.decrement();
    await this.contract.decrement();

    let curr_count = await this.contract.getCount();
    expect(curr_count.toString()).to.equal("0");
  });

  it("Owner try to decrement 0 value", async function () {
    await expectRevert(
      this.contract.decrement({ from: owner }),
      "Unable to decrement Zero value!"
    );
  });

  it("Call increment with non-Owner account", async function () {
    await expectRevert(
      this.contract.increment({ from: other }),
      "Ownable: caller is not the owner"
    );
  });

  it("Call decrement with non-Owner account", async function () {
    await expectRevert(
      this.contract.decrement({ from: other }),
      "Ownable: caller is not the owner"
    );
  });
});
