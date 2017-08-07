const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));


describe('_', () => {
  it('is an object', () => {
    expect(_).to.be.an('object');
  });

  describe('#identity', () => {
    it('is a function', () => {
      expect(_.identity).to.be.a('function');
    });
    it('should return the original value if given a number', () => {
      const result = _.identity(300);
      expect(result).to.equal(300);
    });
    it('should return the original value if given a string', () => {
      const result = _.identity('Hello World');
      expect(result).to.equal('Hello World');
    });
    it('should return the original value if given an array', () => {
      const input = [1, 2, 3, 4];
      const result = _.identity(input);
      expect(result).to.equal(input);
    });
  });
});
