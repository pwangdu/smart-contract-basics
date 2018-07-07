const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface,bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery',()=>{
    it('should deploy contract',()=>{
        assert.ok(lottery.options.address);
    });
    it('should set the contract creater account as manager', async () => {    
        const manager = await lottery.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
    it('should set the players to be empty upon creation', async () => {    
        const players = await lottery.methods.getPlayers().call();
        console.log(players);
    });
})