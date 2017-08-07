const _ = require('underscore');
const binarySearch = require('./helperFunctions/binarySearch');

function once(func) {
  let called = false;
  let result;
  return function () {
    if (!called) {
      called = true;
      result = func.apply(this, arguments);
    }
    return result;
  };
}


function memoize(fn, hash) {
  const cache = {};
  const memo = function () {
    const args = hash ? hash.apply(null, arguments) : JSON.stringify(arguments[0]);
    if (!cache[args]) {
      cache[args] = fn.apply(null, arguments);
    }
    return cache[args];
  };
  memo.cache = cache;
  return memo;
}


function shuffle(arr) {
  if (!Array.isArray(arr) && typeof arr !== 'object') return [];
  const shuffled = [];

  while (arr.length > 0) {
    const randomNumber = Math.floor(Math.random() * arr.length + 1);

    const temp = arr[arr.length - 1];
    arr[arr.length - 1] = arr[randomNumber - 1];
    arr[randomNumber - 1] = temp;

    const numMoved = arr.slice(-1);

    shuffled.unshift(numMoved);

    arr.pop();
  }
  return _.flatten(shuffled);
}


function invoke(list, method) {
  const args = Array.prototype.slice.call(arguments, 2);

  return _.map(list, (elem) => {
    const func = elem[method];
    return func ? func.apply(elem, args) : elem.null;
  });
}


function sortBy(list, iteratee) {
  if (typeof iteratee === 'function') {
    return list.sort((a, b) => iteratee(a) - iteratee(b));
  }
  return list.sort((a, b) => a[iteratee] - b[iteratee]);
}


function zip(...args) {
  return Object.keys(args[0]).map(key => args.map(array => array[key]));
}


function sortedIndex(list, value, iteratee) {
  if (!Array.isArray(list)) return 0;
  let startIndex = 0;
  let stopIndex = list.length - 1;
  let index = (startIndex + stopIndex) >> 1;

  while (list[index] !== value && startIndex < stopIndex) {
    if (value < list[index]) {
      stopIndex = index - 1;
    } else if (value > list[index]) {
      startIndex = index + 1;
    }
    index = (startIndex + stopIndex) >> 1;
    return index;
  }
}


function flatten(arr, shallow) {
  if (!Array.isArray(arr)) return [];

  return _.reduce(arr, (res, elem) => {
    if (Array.isArray(elem) && !shallow) {
      elem = _.flatten(elem);
    }

    return res.concat(elem);
  }, []);
}


function intersection(...args) {
  const result = [];
  _.each(args[0], (arrayElem) => {
    let isShared = false;
    for (let i = 1; i < args.length; i++) {
      _.each(args[i], (check) => {
        if (arrayElem === check) {
          isShared = true;
        }
      });
    }

    if (isShared) {
      result.push(arrayElem);
    }
  });

  return result;
}


function difference() {
  const result = [];
  const args = [...arguments];
  const alternate = args.slice(1, args.length);
  for (let j = 0; j < args[0].length; j++) {
    const current = args[0][j];
    if (_.every(alternate, array => !_.contains(array, current))) { result.push(current); }
  }
  return result;
}


function throttle(func, wait) {
  const args = [...arguments].slice(2, arguments.length);
  let result;
  let counter = 0;
  return () => {
    if (counter === 0) {
      result = func.apply(null, [args]);
      return result;
    }
    while (counter > 0) {
      counter--;
      result = _.delay(func, wait);
      return result;
    }
  };
}

module.exports = {
  once,
  memoize,
  shuffle,
  invoke,
  sortBy,
  zip,
  sortedIndex,
  flatten,
  intersection,
  difference,
  throttle,
};
