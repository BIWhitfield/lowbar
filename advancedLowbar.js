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

module.exports = {
  once,
};
