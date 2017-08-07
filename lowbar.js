const _ = {};

_.identity = value => value;

if (typeof module !== 'undefined') {
  module.exports = _;
}
