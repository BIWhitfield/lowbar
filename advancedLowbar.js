const _ = require('underscore');

function once(func) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      return func.apply(null, arguments);
    }
  };
}


function memoize(fn, hash) {
  const cache = {};
  const memo = function (key) {
    if (!(key in cache)) {
      cache[key] = fn.apply(null, arguments);
    }
    return cache[key];
  };
  memo.cache = cache;
  return memo;
}

function shuffle(arr) {
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

module.exports = {
  once,
  memoize,
  shuffle,
};
