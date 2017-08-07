const expect = require('chai').expect;
const sinon = require('sinon');
const { once, memoize, shuffle, invoke } = require('../advancedLowbar.js');

describe('once', () => {
  it('is a function', () => {
    expect(once).to.be.a('function');
  });
  it('should receive one argument as a function', () => {
    expect(once.length).to.equal(1);
  });
  it('should call the given function only once', () => {
    let count = 0;
    const testMe = () => {
      count++;
    };

    const limitTest = once(testMe);
    once(testMe);
    once(testMe);
    limitTest();
    expect(count).to.equal(1);
  });
  it('should call the given function only once (sinon test)', () => {
    const spy = sinon.spy();
    const test = once(spy);
    once(spy);
    once(spy);
    test();
    expect(spy.callCount).to.equal(1);
  });
});


describe('memoize', () => {
  it('is a function', () => {
    expect(memoize).to.be.a('function');
  });
  it('should receive two arguments 1st as a function 2nd as a hash', () => {
    expect(memoize.length).to.equal(2);
  });
  it('should return the same value as original function', () => {
    const dble = n => 2 * n;
    const memDble = memoize(dble);
    const output = memDble(5);
    const expected = memDble(5);
    expect(output).to.equal(expected);
  });
  it('should call the function only once for multiple calls with the same argument', () => {
    const dble = n => 2 * n;
    const spy = sinon.spy(dble);
    const memDble = memoize(spy);
    memDble(5);
    memDble(5);
    memDble(5);
    expect(spy.callCount).to.equal(1);
  });
  it('should call the function multiple times with different arguments', () => {
    const dble = n => 2 * n;
    const spy = sinon.spy(dble);
    const memDble = memoize(spy);
    memDble(1);
    memDble(5);
    memDble(9);
    expect(spy.callCount).to.equal(3);
  });
  it('has a cache property which stores the cache object', () => {
    const dble = n => 2 * n;
    const memDble = memoize(dble);
    memDble(2);
    expect(memDble.cache).to.eql({ 2: 4 });
  });
  it('has a hash as a second argument to work out the hash key for storing', () => {
    const iteratee = n => n * 2;
    const hashFunction = n => `num${n}`;
    const test = memoize(iteratee, hashFunction);
    test(2);

    const actual = test.cache;
    const expected = { num2: 4 };
    expect(actual).to.eql(expected);
  });
});


describe('shuffle', () => {
  it('is a function', () => {
    expect(shuffle).to.be.a('function');
  });
  it('should receive 1 argument', () => {
    expect(shuffle.length).to.equal(1);
  });
  it('should return a randomly shuffled array of the same length', () => {
    const sortedArray = [1, 2, 3, 4, 5];
    expect(shuffle(sortedArray)).to.have.lengthOf(5);
  });
  it('should return an empty array for invalid arguments', () => {
    expect(shuffle()).to.eql([]);
    expect(shuffle(10)).to.eql([]);
  });
});


describe('invoke', () => {
  it('is a function', () => {
    expect(invoke).to.be.a('function');
  });
  it('invokes the method for each element on the list and returns the result', () => {
    expect(invoke([[3, 2, 1]], 'sort')).to.eql([[1, 2, 3]]);
    const actual = invoke([[3, 2, 1], [4, 3, 2]], 'sort');
    const expected = [[1, 2, 3], [2, 3, 4]];
    expect(actual).to.eql(expected);
  });
  it('invokes the method given with the arguments provided', () => {
    const iteratee = e => e > 2;
    const actual = invoke([[3, 2, 1], [4, 3, 2]], 'filter', iteratee);
    const expected = [[3], [4, 3]];
    expect(actual).to.eql(expected);
  });
  it('handles objects inputs', () => {
    const actual = invoke({ 1: 1, 2: 2 }, 'toString');
    const expected = ['1', '2'];
    expect(actual).to.eql(expected);
  });
  it('handles invalid inputs', () => {
    expect(invoke()).to.eql([]);
    expect(invoke([3, 2])).to.eql([undefined, undefined]);
  });
});
