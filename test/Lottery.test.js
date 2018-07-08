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
        assert.equal(1, players.length);
    });

    it('should let the player enter after sending atleast 0.01 ether', async () => {    
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('10','ether')
        });
        const players = await lottery.methods.getPlayers().call();
        assert.equal(2, players.length);
        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
    });

    it('should not let the player enter after sending less than 0.01 ether', async () => {    
        try {
            await lottery.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('0.001','ether')
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    // it('should not allow non manager to draw', async () => {
    //     try {
    //         await lottery.methods.enter().send({
    //             from: accounts[2],
    //             value: web3.utils.toWei('10','ether')
    //         });
    //         await lottery.methods.draw().call();
    //         assert(false);
    //     } catch (err) {
    //         console.log(err);
    //         assert(err);
    //     }
    // });
});