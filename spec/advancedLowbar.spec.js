const expect = require('chai').expect;
const sinon = require('sinon');
const { once, memoize, shuffle } = require('../advancedLowbar.js');

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
});
