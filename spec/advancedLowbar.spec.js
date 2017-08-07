const expect = require('chai').expect;
const sinon = require('sinon');
const {
  once,
  memoize,
  shuffle,
  invoke,
  sortBy,
  zip,
  sortedIndex,
  flatten,
  intersection,
} = require('../advancedLowbar.js');

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
    const actual = invoke({ one: 1, two: 2 }, 'toString');
    const expected = ['1', '2'];
    expect(actual).to.eql(expected);
  });
  it('handles invalid inputs', () => {
    expect(invoke()).to.eql([]);
    expect(invoke([3, 2])).to.eql([undefined, undefined]);
  });
});


describe('sortBy', () => {
  it('it should be a function', () => {
    expect(sortBy).to.be.a('function');
  });
  it('returns an ascended sorted copy of the list, using the result of running each value though the iteratee', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const iteratee = num => Math.sin(num);
    const expected = [5, 4, 6, 3, 1, 2];
    expect(sortBy(list, iteratee)).to.eql(expected);
  });
});


describe('zip', () => {
  it('it is a function', () => {
    expect(zip).to.be.a('function');
  });
  it('merges the values of each array with values at corresponding positions', () => {
    const output = [['Pat', 35, true], ['Dave', 41, true], ['Neil', 60, false]];
    expect(zip(['Pat', 'Dave', 'Neil'], [35, 41, 60], [true, true, false])).to.eql(output);
  });
});

describe('sortedIndex', () => {
  it('is a function', () => {
    expect(sortedIndex).to.be.a('function');
  });
  it('returns the index at which the value should be inserted in the list to maintain order', () => {
    const actual = sortedIndex([1, 2, 3, 5, 6], 4);
    const expected = 3;
    expect(actual).to.equal(expected);
  });
  it('handles invalid inputs', () => {
    expect(sortedIndex()).to.equal(0);
    expect(sortedIndex(null)).to.equal(0);
    expect(sortedIndex(false)).to.equal(0);
  });
});


describe('flatten', () => {
  it('is a function', () => {
    expect(flatten).to.be.a('function');
  });
  it('handles invalid inputs', () => {
    expect(flatten()).to.eql([]);
    expect(flatten(null)).to.eql([]);
    expect(flatten({ 1: 1 })).to.eql([]);
  });
  it('flattens a one depth nested array', () => {
    expect(flatten([1, [2]])).to.eql([1, 2]);
  });
  it('flattens nested arrays', () => {
    expect(flatten([1, [[[2]]]])).to.eql([1, 2]);
    expect(flatten([1, [[[[2, [[[[[3]]]]]]]]]])).to.eql([1, 2, 3]);
  });
  it('accepts a shallow parameter flatten just one level', () => {
    expect(flatten([1, [[[[2]]]]], true)).to.eql([1, [[[2]]]]);
    expect(flatten([1, [[[[2]]]]], undefined)).to.eql([1, 2]);
  });
});


describe('intersection', () => {
  it('is a function', () => {
    expect(intersection).to.be.a('function');
  });
  it('handles invalid inputs', () => {
    expect(intersection()).to.eql([]);
    expect(intersection(null)).to.eql([]);
    expect(intersection({ 1: 1 })).to.eql([]);
  });
  it('finds the values common in all arrays given', () => {
    const actual = intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    const expected = [1, 2];
    expect(actual).to.eql(expected);
  });
  it('finds the values common in all arrays and objects given', () => {
    const actual = intersection([1, 2, 3], [101, 2, 1, 10], { 1: 1, 2: 2 });
    const expected = [1, 2];
    expect(actual).to.eql(expected);
  });
});
