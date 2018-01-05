const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const osmcController = require('../../src/osmcController');

describe('osmcController', function () {
    describe('addFolder', function () {
        it('cas passant', function () {
            let result = osmcController.addFolder('', 'testDir');
            return expect(result).to.eventually.equal('testDir')
        });
    });
});