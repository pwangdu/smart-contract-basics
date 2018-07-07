pragma solidity ^0.4.7;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}