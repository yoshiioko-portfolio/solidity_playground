// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Stack {
    uint[] stack;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier stackNotEmpty() {
        require(!isEmpty(), "Unable to perform action because the Stack is empty!");
        _;
    }

    function getStack() public view returns (uint[] memory) {
        return stack;
    }

    function push(uint number) public onlyOwner {
        stack.push(number);
    }

    function pop() public onlyOwner stackNotEmpty {
        stack.pop();
    }

    function isEmpty() public view returns (bool) {
        return stack.length == 0 ? true : false;
    }

    function peek() public view stackNotEmpty returns (uint) {
        return stack[stack.length - 1];
    }
}
