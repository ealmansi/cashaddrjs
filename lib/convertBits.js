'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data, from, to) {
  var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var result = [];
  var mask = (1 << to) - 1;
  var accumulator = 0;
  var bits = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (value < 0 || value >> from !== 0) {
        throw new Error('Invalid value: ' + value + '.');
      }
      accumulator = accumulator << from | value;
      bits += from;
      while (bits >= to) {
        bits -= to;
        result.push(accumulator >> bits & mask);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!strict) {
    if (bits > 0) {
      result.push(accumulator << to - bits & mask);
    }
  } else if (bits >= from || accumulator << to - bits & mask) {
    throw new Error('Conversion requires padding but strict mode was used.');
  }
  return result;
};