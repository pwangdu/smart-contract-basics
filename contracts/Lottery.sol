pragma solidity ^0.4.7;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
        players = new address[](0);
        players.push(manager);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, players, block.coinbase)));
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether,"Must send atleast 0.01 ether");
        players.push(msg.sender);
    }

    function draw () public {
        require(msg.sender != manager, "Only manager can Draw");
        address winner = players[random() % players.length];
        players = new address[](0);
        players.push(manager);
        manager.transfer(address(this).balance / 20);
        winner.transfer(address(this).balance / 2);
    }
}