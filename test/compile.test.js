const assert = require('assert');
const { interface, bytecode } = require('../compile');

describe('Compiler',() => {
    it('must compile',() => {
        assert.ok(interface);
        assert.ok(bytecode);
    })
});