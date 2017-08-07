const expect = require('chai').expect;
const sinon = require('sinon');
const { once } = require('../advancedLowbar.js');

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
