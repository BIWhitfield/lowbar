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
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.each([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
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

  describe('#indexOf', () => {
    it('is a function', () => {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns the index of the item', () => {
      expect(_.indexOf([1, 2, 3], 2)).to.eql(1);
    });
    it('returns the index of the item', () => {
      expect(_.indexOf([1, 2, 3], 1)).to.eql(0);
    });
    it('should return -1 if the value is not present in the array', () => {
      expect(_.indexOf([1, 2, 3], 52)).to.eql(-1);
    });
    it('uses a binary search if true is passed as an argument for isSorted', () => {
      let actual = _.indexOf([1, 2, 3, 4, 5], 3, true);
      let expected = 2;
      actual = _.indexOf(['a', 'b', 'c', 'd'], 'c', true);
      expected = 2;
      actual = _.indexOf([1, 2, 2, 3], 2, true);
      expected = 1;
      expect(actual).to.equal(expected);
    });
  });

  describe('#filter', () => {
    it('is a function', () => {
      expect(_.filter).to.be.a('function');
    });
    it('should return even numbers when passed an array of numbers', () => {
      const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      function isEven(num) {
        return !(num % 2);
      }
      expect(_.filter(numberList, isEven)).to.eql([2, 4, 6, 8, 10]);
    });
    it('should return words longer than 5 letters long', () => {
      const sentence = ['What', 'even', 'is', 'life', 'maaaate?'];
      function wordOverFiveLetters(word) {
        return word.length > 5;
      }
      expect(_.filter(sentence, wordOverFiveLetters)).to.eql(['maaaate?']);
    });
    it('should return [] if passed an empty array', () => {
      const emptyArray = [];
      expect(_.filter(emptyArray)).to.eql([]);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.filter([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
    });
  });

  describe('#reject', () => {
    it('is a function', () => {
      expect(_.reject).to.be.a('function');
    });
    it('should return the values in the list that do not pass the truthy test', () => {
      const findOdds = [1, 2, 3, 4, 5, 6, 7];
      expect(_.reject(findOdds, num => num % 2 === 0)).to.eql([1, 3, 5, 7]);
    });
    it('should return words no longer than 5 letters long', () => {
      const sentence = ['What', 'even', 'is', 'life', 'maaaate?'];
      function wordOverFiveLetters(word) {
        return word.length > 5;
      }
      expect(_.reject(sentence, wordOverFiveLetters)).to.eql([
        'What',
        'even',
        'is',
        'life',
      ]);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.reject([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
    });
    it('should return [] if passed an empty array', () => {
      const emptyArray = [];
      expect(_.reject(emptyArray)).to.eql([]);
    });
    it('should work when the list is an object or an array', () => {
      const list = { one: 1, two: 2, three: 3 };
      const predicate = n => n >= 2;
      expect(_.reject(list, predicate)).to.eql([1]);
    });
  });

  describe('#uniq', () => {
    it('is a function', () => {
      expect(_.uniq).to.be.a('function');
    });
    it('should return [] if passed an empty array', () => {
      const emptyArray = [];
      expect(_.uniq(emptyArray)).to.eql([]);
    });
    it('should return a duplicate free version of the passed in array', () => {
      const array = [1, 2, 3, 1, 4, 2, 3, 5, 4, 3, 5];
      expect(_.uniq(array)).to.eql([1, 2, 3, 4, 5]);
    });
    it('should return an array of unique words', () => {
      expect(_.uniq(['hello', 'goodbye', 'hello', 'hello'])).to.eql([
        'hello',
        'goodbye',
      ]);
    });
  });

  describe('#map', () => {
    it('is a function', () => {
      expect(_.map).to.be.a('function');
    });
    it('should produce a new array of values based on transformation function', () => {
      expect(_.map([1, 2, 3], num => num * 3)).to.eql([3, 6, 9]);
    });
    it('should work on objects', () => {
      expect(_.map({ one: 1, two: 2, three: 3 }, num => num * 3)).to.eql([3, 6, 9]);
    });
    it('should work for nested arrays', () => {
      expect(_.map([[1, 2], [3, 4]], _.first)).to.eql([1, 3]);
    });
    it('should return [] if passed an empty array', () => {
      const emptyArray = [];
      expect(_.map(emptyArray)).to.eql([]);
    });
    it('passes each element of an array to the iteratee function', () => {
      const spy = sinon.spy();
      _.map([1, 2, 3], spy);
      expect(spy.callCount).to.equal(3);
    });
    it('passes each element of an object to the iteratee function', () => {
      const spy = sinon.spy();
      _.map({ one: 1, two: 2, three: 3, four: 4 }, spy);
      expect(spy.callCount).to.equal(4);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.map([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
    });
  });

  describe('#contains', () => {
    it('is a function', () => {
      expect(_.contains).to.be.a('function');
    });
    it('should return true if the value (number) is present in the list', () => {
      expect(_.contains([1, 2, 3], 3)).to.equal(true);
    });
    it('should return true if the value (string) is present in the list', () => {
      expect(_.contains(['one', 'two', 'three'], 'two')).to.equal(true);
    });
    it('should return false if the value (string) is not present in the list', () => {
      expect(_.contains(['one', 'two', 'three'], 'four')).to.equal(false);
    });
    it('it should start searching at the index provided as the third argument', () => {
      expect(_.contains([1, 2, 3], 1, 1)).to.equal(false);
      expect(_.contains([1, 2, 3, 1], 1, 2)).to.equal(true);
      expect(_.contains([1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 6, 6, 8], 7, 8)).to.equal(true);
    });
  });

  describe('#pluck', () => {
    it('is a function', () => {
      expect(_.pluck).to.be.a('function');
    });
    it('returns an empty array when an invalid type is passed as an argument', () => {
      const actual = _.pluck(1, 'name');
      const expected = [];
      expect(actual).to.eql(expected);
    });
    it('should return the property values that match the passed in propertyName', () => {
      const stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
      expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
  });

  describe('#reduce', () => {
    it('is a function', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('should return a single value with and without memo', () => {
      expect(_.reduce([1, 2, 3], (memo, num) => memo + num, 0)).to.equal(6);
      expect(_.reduce([1, 2, 3], (memo, num) => memo + num)).to.equal(6);
    });
    it('returns the initial value of the memo if passed identity as the iteratee', () => {
      const memo = {};
      expect(_.reduce([1, 2, 3], _.identity, memo)).to.equal(memo);
    });
    it('works for objects as well as arrays', () => {
      const actual = _.reduce({ one: 1, two: 2, three: 3 }, (acc, val) => acc + val, 0);
      const expected = 6;
      expect(actual).to.equal(expected);
      expect(_.reduce({ one: 1, two: 2, three: 3 }, (acc, val) => acc + val)).to.equal(6);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.reduce([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
    });
    it('skips the first element if not passed memo and passes each element of the array to the iteratee function', () => {
      const spy = sinon.spy();
      _.reduce([1, 2, 3], spy);
      expect(spy.callCount).to.equal(2);
    });
    it('skips the first element if not passed memo and passes each element of the object to the iteratee function', () => {
      const spy = sinon.spy();
      _.reduce({ one: 1, two: 2, three: 3, four: 4 }, spy);
      expect(spy.callCount).to.equal(3);
    });
  });

  describe('#every', () => {
    it('is a function', () => {
      expect(_.every).to.be.a('function');
    });
    it('[every] should return a boolean', () => {
      const everyTest = _.every([2, 4, 6], num => num % 2 === 0);
      expect(everyTest).to.equal(true);
    });
    it('[every] should return a true for an array of all even numbers', () => {
      const everyTest = _.every([2, 4, 6, 8, 10], num => num % 2 === 0);
      expect(everyTest).to.equal(true);
    });
    it('[every] should return a false for an array with an odd number in it', () => {
      const everyTest = _.every(
        [2, 4, 6, 7, 8, 9, 10],
        num => num % 2 === 0);
      expect(everyTest).to.equal(false);
    });
    it('works for objects as well as arrays', () => {
      const list = { one: 1, two: 2, three: 3 };
      const predicate = num => num > 0;
      const actual = _.every(list, predicate);
      const expected = true;
      expect(actual).to.equal(expected);
    });
    it('short-circuits and stops traversing the list if a false element is found', () => {
      const list = [1, 2, 3];
      const predicate = num => num < 3;
      const actual = _.every(list, predicate);
      const expected = false;
      expect(actual).to.equal(expected);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.every([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob']);
    });
  });

  describe('#some', () => {
    it('is a function', () => {
      expect(_.some).to.be.a('function');
    });
    it('should return true if it finds a value that passes the predicate truth test', () => {
      expect(_.some([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], num => num === 5)).to.equal(true);
    });
    it('works for objects as well as arrays', () => {
      const list = { one: 1, two: 2, three: 3 };
      const predicate = num => num > 2;
      expect(_.some(list, predicate)).to.equal(true);
    });
    it('should return false if no values in the list pass the test', () => {
      const list = [1, 2, 3];
      const predicate = num => num > 10;
      expect(_.some(list, predicate)).to.equal(false);
    });
    it('should bind the iteratee to a context object if one is passed', () => {
      const context = { name: 'Bob' };
      const result = [];
      const iteratee = () => {
        result.push(context.name);
      };
      _.some([1, 2, 3], iteratee, context);
      expect(result).to.eql(['Bob', 'Bob', 'Bob']);
    });
  });

  describe('#extends', () => {
    it('is a function', () => {
      expect(_.extends).to.be.a('function');
    });
    it('returns the destination when not passed a second argument', () => {
      expect(_.extends({ name: 'Ben' })).to.eql({ name: 'Ben' });
    });
    it('shallow copies all the properties in the source object(s) over to the destination object, (returns the destination object)', () => {
      expect(_.extends({ name: 'Ben' }, { instrument: 'guitar' })).to.eql({ name: 'Ben', instrument: 'guitar' });
    });
    it('updates the destination object if the source has the same key', () => {
      expect(_.extends({ name: 'Ben', instrument: 'guitar' }, { instrument: 'drums' })).to.eql({ name: 'Ben', instrument: 'drums' });
    });
  });

  describe('#defaults', () => {
    it('is a function', () => {
      expect(_.defaults).to.be.a('function');
    });
    it('returns the destination when not passed a second argument', () => {
      const actual = _.defaults({ gym: 'no' });
      const expected = { gym: 'no' };
      expect(actual).to.eql(expected);
    });
    it('fills in undefined properties in object with the first value present in the list of defaults objects', () => {
      const actual = _.defaults({ animal: 'cat' }, { animal: 'dog', colour: 'ginger' });
      const expected = { animal: 'cat', colour: 'ginger' };
      expect(actual).to.eql(expected);
    });
    it('does not update existing keys', () => {
      const actual = _.defaults({ instrument: 'guitar' }, { instrument: 'drums', vocals: 'no' });
      const expected = { instrument: 'guitar', vocals: 'no' };
      expect(actual).to.eql(expected);
    });
  });
});
