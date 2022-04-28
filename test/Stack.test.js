// Load dependencies
const { expect } = require("chai");

// Load compiled artifacts
const Stack = artifacts.require("Stack");

// Start test block
contract("Stack", function () {
  beforeEach(async function () {
    // Deploy the contract for each test
    this.stack = await Stack.new();
  });

  // Test case 1
  it("Stack is empty when created", async function () {
    let stack_empty = await this.stack.isEmpty();
    expect(stack_empty).to.equal(true);
  });

  // Test case 2
  it("Stack is not empty after pushing two items", async function () {
    await this.stack.push(0);
    await this.stack.push(1);

    let stack_empty = await this.stack.isEmpty();
    expect(stack_empty).to.equal(false);
  });

  // Test case 3
  it("Stack data matches the values that were pushed", async function () {
    await this.stack.push(0);
    await this.stack.push(1);
    await this.stack.push(2);
    await this.stack.push(3);

    let stack_values = await this.stack.getStack();
    expect(stack_values.toString()).to.equal("0,1,2,3");
  });

  // Test case 4
  it("Stack has a single element after multiple push/pop operations", async function () {
    await this.stack.push(0);
    await this.stack.push(1);
    await this.stack.push(2);
    await this.stack.push(3);

    await this.stack.pop();
    await this.stack.pop();
    await this.stack.pop();

    let stack_array = await this.stack.getStack();
    expect(stack_array.toString()).to.equal("0");
  });

  // Test case 5
  it("Stack returns correct peek value after pushing values to it", async function () {
    await this.stack.push(0);
    await this.stack.push(1);

    let peek_value = await this.stack.peek();
    expect(peek_value.toNumber()).to.equal(1);
  });
});
