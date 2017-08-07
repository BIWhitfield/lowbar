const _ = require('underscore');

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

module.exports = {
  once,
  memoize,
  shuffle,
  invoke,
  sortBy,
};
