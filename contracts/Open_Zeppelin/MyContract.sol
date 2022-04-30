// Example of how to use Ownable
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Contract implements a simple counter that has access
 * control via the use of OpenZeppelin Ownable contract.
 */
contract MyContract is Ownable {
    uint count = 0;

    /**
     * @dev Returns the current value of the counter.
     */
    function getCount() public view returns (uint) {
        // Anyone can call this function
        return count;
    }

    /**
     * @dev Increments the counter.
     * Can only be called by the contract owner
     */
    function increment() public onlyOwner {
        count = count + 1;
    }

    /**
     * @dev Decrements the counter.
     * Can only be called by the contract owner
     */
    function decrement() public onlyOwner {
        require(count > 0, "Unable to decrement Zero value!");
        count = count - 1;
    }
}
