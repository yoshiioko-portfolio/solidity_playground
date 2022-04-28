// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title An implementation of the Stack Data Structure in Solidity
contract Stack {
    uint[] stack;
    address owner;
    
    /// @notice Constructor sets the user who creates the contract as the owner 
    constructor() {
        owner = msg.sender;
    }

    /// @notice Modifier used to prevent non-owners from executing certain functions 
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    /// @notice Modifier used to verify that the stack is not empty 
    modifier stackNotEmpty() {
        require(!isEmpty(), "Unable to perform action because the Stack is empty!");
        _;
    }

    /// @notice Used to return the Stack's internal array holding its stack values
    /// @return uint[] Array of values in the Stack
    function getStack() public view returns (uint[] memory) {
        return stack;
    }

    /// @notice Implements the Push operation of a Stack
    /// @param number Value that will be pushed to the top of the Stack
    function push(uint number) public onlyOwner {
        stack.push(number);
    }

    /// @notice Implements the Pop operation of a Stack
    function pop() public onlyOwner stackNotEmpty {
        stack.pop();
    }

    /// @notice Checks if the Stack is currently empty
    /// @return bool if empty, False if not empty
    function isEmpty() public view returns (bool) {
        return stack.length == 0 ? true : false;
    }

    /// @notice Implements the Peek operation of a Stack
    /// @return uint top value of the Stack but does not remove it from the structure
    function peek() public view stackNotEmpty returns (uint) {
        return stack[stack.length - 1];
    }
}
