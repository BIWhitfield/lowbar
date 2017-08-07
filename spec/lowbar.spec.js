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

  describe('#first', () => {
    it('is a function', () => {
      expect(_.first).to.be.a('function');
    });
    it('should return 1 for first( [1,2,3], 1 )', () => {
      expect(_.first([1, 2, 3], 1)).to.eql([1]);
    });
    it('should return [4, 5] for first( [4,5,6], 2 )', () => {
      expect(_.first([4, 5, 6], 2)).to.eql([4, 5]);
    });
    it('should return [7, 8, 9] for first( [7, 8, 9], 3 )', () => {
      expect(_.first([7, 8, 9], 3)).to.eql([7, 8, 9]);
    });
    it('should return undefined if not passed an argument', () => {
      const result = _.first();
      expect(result).to.eql(undefined);
    });
  });
});
