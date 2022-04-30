// Example of how to use Ownable
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    uint count = 0;

    function getCount() public view returns (uint) {
        // Anyone can call this function
        return count;
    }

    function increment() public onlyOwner {
        count = count + 1;
    }

    function decrement() public onlyOwner {
        require(count > 0, "Unable to decrement Zero value!");
        count = count - 1;
    }
}
