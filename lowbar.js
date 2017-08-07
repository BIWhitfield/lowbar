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




if (typeof module !== 'undefined') {
  module.exports = _;
}
