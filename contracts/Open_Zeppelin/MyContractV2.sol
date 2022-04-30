// Example of how to use AccessControl
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

/** 
 * @dev ...
 */
contract MyContractV2 is AccessControl {
    bytes32 public constant INCREMENTER_ROLE = keccak256("INCREMENTER_ROLE");
    bytes32 public constant DECREMENTER_ROLE = keccak256("DECREMENTER_ROLE");
    uint count;

    /**
     * @dev ...
     */
    constructor(address incrementer, address decrementer) {
        count = 0;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(INCREMENTER_ROLE, incrementer);
        _setupRole(DECREMENTER_ROLE, decrementer);
    }

    /**
     * @dev ...
     */
    function getCount() public view returns(uint) {
        return count;
    }

    /**
     * @dev ...
     */
    function increment() public onlyRole(INCREMENTER_ROLE) {
        count += 1;
    }

    /**
     * @dev ...
     */
    function decrement() public onlyRole(DECREMENTER_ROLE) {
        require(count > 0, "Unable to decrement zero value!");
        count -= 1;
    }
}