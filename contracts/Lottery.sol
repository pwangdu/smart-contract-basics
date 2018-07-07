pragma solidity ^0.4.7;

contract Lottery {
    address public manager;

    constructor() public {
        manager = msg.sender;
    }
}
