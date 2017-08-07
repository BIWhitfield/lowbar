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

  describe('#last', () => {
    it('is a function', () => {
      expect(_.last).to.be.a('function');
    });
    it('should return 3 for last( [1,2,3], 1 )', () => {
      expect(_.last([1, 2, 3], 1)).to.eql([3]);
    });
    it('should return [5, 6] for last( [4,5,6], 2 )', () => {
      expect(_.last([4, 5, 6], 2)).to.eql([5, 6]);
    });
    it('should return [7, 8, 9] for last( [7, 8, 9], 3 )', () => {
      expect(_.last([7, 8, 9], 3)).to.eql([7, 8, 9]);
    });
    it('should return undefined if not passed an argument', () => {
      const result = _.last();
      expect(result).to.eql(undefined);
    });
  });

  describe('#each', () => {
    it('is a function', () => {
      expect(_.each).to.be.a('function');
    });
    it('calls the passed function as many times as elements in the array', () => {
      let count = 0;
      _.each([1, 2, 3], () => {
        count++;
      });
      expect(count).to.equal(3);
    });
    it('calls the function with each item of the array as the first argument', () => {
      const basket = [];
      function putItemInBasket(item) {
        basket.push(item);
      }
      _.each([1, 2, 3], putItemInBasket);
      expect(basket).to.eql([1, 2, 3]);
    });
    it('works with objects', () => {
      const actual = [];
      const expected = [1, 2, 3];
      _.each({ one: 1, two: 2, three: 3 }, num => actual.push(num));
      expect(actual).to.eql(expected);
    });
    it('calls the function with each item of the array as first argument with its index', () => {
      const basket = [];
      function putItemInBasket(item, i) {
        basket.push(item, i);
      }
      _.each([1, 2, 3], putItemInBasket);
      expect(basket).to.eql([1, 0, 2, 1, 3, 2]);
    });
    it('calls the iteratee function with each element from the list', () => {
      const spy = sinon.spy();
      _.each([1, 2, 3], spy);
      _.each({ one: 1, two: 2, three: 3 }, spy);
      expect(spy.callCount).to.equal(6);
    });
  });
});
