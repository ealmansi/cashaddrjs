'use strict';

// Copyright (c) 2017 Emilio Almansi
// Copyright (c) 2017 Pieter Wuille
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Converts an array of integers made up of `from` bits into an
 * array of integers made up of `to` bits. The output array is
 * zero-padded if necessary, unless strict mode is true.
 * Original by Pieter Wuille: https://github.com/sipa/bech32.
 *
 * @param {Array} data Array of integers made up of `from` bits.
 * @param {number} from Length in bits of elements in the input array.
 * @param {number} to Length in bits of elements in the output array.
 * @param {bool} strict Require the conversion to be completed without padding.
 */
module.exports = function (data, from, to) {
  var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var accumulator = 0;
  var bits = 0;
  var result = [];
  var mask = (1 << to) - 1;
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