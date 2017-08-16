
module.exports = function binarySearch(list, value) {
  let s = 0;
  let e = list.length - 1;

  for (let loop = 0; loop < list.length; loop++) {
    const m = Math.floor((s + e) / 2);

    if (list[m] === value) {
      return m;
    }

    if (list[m] > value) {
      e = m - 1;
    }

    if (list[m] < value) {
      s = m + 1;
    }
  }

  return -1;
};
