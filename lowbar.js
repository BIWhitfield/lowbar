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


_.indexOf = function (array, index, isSorted) {
  isSorted = isSorted || false;
  if (isSorted) {
    let first = 0;
    let last = array.length - 1;
    let mid;
    while (first < last) {
      mid = Math.floor((first + last) / 2);
      if (array[mid] === index) {
        return mid;
      }
      if (index < array[mid]) {
        last = mid - 1;
      } else {
        first = mid + 1;
      }
    }
    return -1;
  }
  let counter = array.length;
  while (counter > 0) {
    for (let i = 0; i < array.length; i++) {
      counter--;
      if (array[i] === index) return i;
    }
  }
  return -1;
};


_.filter = function (array, func) {
  array = array || [];
  const result = [];
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (func(array[i])) result.push(array[i]);
    }
    return result;
  }
  for (const key in array) {
    if (func(array[key])) result.push(array[key]);
  }
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
