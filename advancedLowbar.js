// const _ = require('underscore');

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

module.exports = {
  once,
  memoize,
};
