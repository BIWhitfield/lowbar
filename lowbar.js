const _ = {};

_.identity = value => value;


_.first = function (array, n) {
  if (!arguments.length || array.length === 0) return undefined;
  if (arguments.length === 1) {
    return array[0];
  } else if (arguments.length === 2) {
    return array.slice(0, n);
  }
};


_.last = function (array, n) {
  if (arguments.length === 1) {
    return array.pop();
  } else if (arguments.length === 2) {
    return array.slice(-n);
  }
};


_.each = (array, func) => {
  if (Array.isArray(array) || typeof array === 'string') {
    for (let i = 0; i < array.length; i++) {
      func(array[i], i, array);
    }
  } if (typeof array === 'object' && !Array.isArray(array)) {
      for (const key in array) {
        func(array[key], key, array);
      }
  }
  return array;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
