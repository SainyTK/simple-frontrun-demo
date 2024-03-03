// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Airdrop {

    mapping(uint => address) beneficiary;

    event Claimed(uint256 indexed blockNumber, address indexed  beneficiary);

    function claim() external {
        require(beneficiary[block.number] == address(0), "The airdrop has been claimed");
        beneficiary[block.number] = msg.sender;
        emit Claimed(block.number, msg.sender);
    }

}