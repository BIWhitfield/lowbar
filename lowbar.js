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


_.reject = function (array, func) {
  const result = [];
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (!func(array[i])) result.push(array[i]);
    }
    return result;
  }
  for (const key in array) {
    if (!func(array[key])) result.push(array[key]);
  }
  return result;
};


_.uniq = function (array) {
  array = array || [];
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (newArray.indexOf(value) === -1) {
      newArray.push(value);
    }
  }
  return newArray;
};


_.map = function (array, func) {
  array = array || [];
  const newArray = [];
  if (!Array.isArray(array)) {
    for (const prop in array) {
      const objResult = func(array[prop]);
      newArray.push(objResult);
    }
  }

  for (let i = 0; i < array.length; i++) {
    const result = func(array[i]);
    newArray.push(result);
  }
  return newArray;
};


_.contains = function (array, target, fromIndex) {
  if (Array.isArray(array) && arguments.length === 3) {
    const slice = array.slice(fromIndex);
    if (slice.indexOf(target) === -1) {
      return false;
    }
  }

  if (Array.isArray(array)) {
    if (_.indexOf(array, target) !== -1) return true;
  } else {
    for (const key in array) {
      if (array[key] === target) return true;
    }
  }
  return false;
};


_.pluck = function (list, propertyName) {
  return _.map(list, obj => obj[propertyName]);
};

_.reduce = function (list, iteratee, memo) {
  let memoUndefined = arguments.length < 3;
  _.each(list, (elem, index) => {
    if (memoUndefined) {
      memoUndefined = false;
      memo = elem;
    } else memo = iteratee(memo, elem, index, list);
  });
  return memo;
};


_.every = function (list, predicate) {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i])) return false;
    }
  } else {
    for (const key in list) {
      if (!predicate(list[key])) return false;
    }
  }
  return true;
};


_.some = function (list, predicate) {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) return true;
    }
  } else if (typeof list === 'object') {
    for (const key in list) {
      if (predicate(list[key])) return true;
    }
  }
  return false;
};


_.extends = function (destination, sources) {
  return Object.assign(destination, sources);
};


_.defaults = function (objects, defaults) {
  for (const key in defaults) {
    if (!objects.hasOwnProperty(key)) {
      objects[key] = defaults[key];
    }
  }
  return objects;
};


if (typeof module !== 'undefined') {
  module.exports = _;
}
