// Example of how to use AccessControl
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/** 
 * @dev Implements a simple counter contract that uses AccessControl for limiting access
 */
contract MyContractV2 is AccessControl {
    bytes32 public constant INCREMENTER_ROLE = keccak256("INCREMENTER_ROLE");
    bytes32 public constant DECREMENTER_ROLE = keccak256("DECREMENTER_ROLE");
    uint count;

    /**
     * @dev Constructor for the contract. Initialized the creator as the DEFAULT_ADMIN_ROLE.
     * Assigns the INCREMENTER_ROLE and DECREMENTER_ROLE to addresses that are passed in.
     */
    constructor(address incrementer, address decrementer) {
        count = 0;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(INCREMENTER_ROLE, incrementer);
        _setupRole(DECREMENTER_ROLE, decrementer);
    }

    /**
     * @dev Returns the current value of the counter.
     */
    function getCount() public view returns(uint) {
        return count;
    }

    /**
     * @dev Increments the counter value.
     * Can only be called by user with INCREMENTER_ROLE
     */
    function increment() public onlyRole(INCREMENTER_ROLE) {
        count += 1;
    }

    /**
     * @dev Decrements the counter value.
     * Can only be called by the user with DECREMENTER_ROLE
     */
    function decrement() public onlyRole(DECREMENTER_ROLE) {
        require(count > 0, "Unable to decrement zero value!");
        count -= 1;
    }
}
