'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;

var _ensure = require('./ensure');

var _ensure2 = _interopRequireDefault(_ensure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * Charset containing the 32 symbols used in the base32 encoding.
 */
var CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

/***
 * Inverted index mapping each symbol into its index within the charset.
 */
/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

var CHARSET_INVERSE_INDEX = {
  'q': 0, 'p': 1, 'z': 2, 'r': 3, 'y': 4, '9': 5, 'x': 6, '8': 7,
  'g': 8, 'f': 9, '2': 10, 't': 11, 'v': 12, 'd': 13, 'w': 14, '0': 15,
  's': 16, '3': 17, 'j': 18, 'n': 19, '5': 20, '4': 21, 'k': 22, 'h': 23,
  'c': 24, 'e': 25, '6': 26, 'm': 27, 'u': 28, 'a': 29, '7': 30, 'l': 31
};

/***
 * Encodes the given array of 5-bit integers as a base32-encoded string.
 *
 * @param {Array} data Array of integers between 0 and 31 inclusive.
 */
function encode(data) {
  (0, _ensure2.default)(data instanceof Array, 'Invalid data: ' + data + '.');
  var base32 = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      (0, _ensure2.default)(0 <= value && value < 32, 'Invalid value: ' + value + '.');
      base32 += CHARSET[value];
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

  return base32;
}

/***
 * Decodes the given base32-encoded string into an array of 5-bit integers.
 *
 * @param {string} base32 
 */
function decode(base32) {
  (0, _ensure2.default)(typeof base32 === 'string', 'Invalid base32-encoded string: ' + base32 + '.');
  var data = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = base32[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      (0, _ensure2.default)(value in CHARSET_INVERSE_INDEX, 'Invalid value: ' + value + '.');
      data.push(CHARSET_INVERSE_INDEX[value]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return data;
}