'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = undefined;
exports.encode = encode;
exports.decode = decode;

var _bigInteger = require('big-integer');

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _validation = require('./validation');

var _base = require('./base32');

var base32 = _interopRequireWildcard(_base);

var _convertBits3 = require('./convertBits');

var _convertBits4 = _interopRequireDefault(_convertBits3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } /***
                                                                               * @license
                                                                               * https://github.com/bitcoincashjs/cashaddr
                                                                               * Copyright (c) 2017 Emilio Almansi
                                                                               * Distributed under the MIT software license, see the accompanying
                                                                               * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
                                                                               */

/**
 * Encodes a hash from a given type into a Bitcoin Cash address with the given prefix.
 * 
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'.
 * @param {string} type Type of address to generate. Either 'P2PKH' or 'P2SH'.
 * @param {Array} hash Hash to encode represented as an array of 8-bit integers.
 */
function encode(prefix, type, hash) {
  (0, _validation.validate)(typeof prefix === 'string', 'Invalid prefix: ' + prefix + '.');
  (0, _validation.validate)(typeof type === 'string', 'Invalid type: ' + type + '.');
  (0, _validation.validate)(hash instanceof Array, 'Invalid hash: ' + hash + '.');
  var prefixData = prefixToArray(prefix).concat([0]);
  var versionByte = getTypeBits(type) + getHashSizeBits(hash);
  var payloadData = (0, _convertBits4.default)([versionByte].concat(hash), 8, 5);
  var checksumData = prefixData.concat(payloadData).concat(new Array(8).fill(0));
  var payload = payloadData.concat(checksumToArray(polymod(checksumData)));
  return prefix + ':' + base32.encode(payload);
}

/**
 * Decodes the given address into its constituting prefix, type and hash. See [#encode()]{@link encode}.
 * 
 * @param {string} address Address to decode. E.g.: 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'.
 */
function decode(address) {
  (0, _validation.validate)(typeof address === 'string', 'Invalid address: ' + address + '.');
  var pieces = address.split(':');
  (0, _validation.validate)(pieces.length === 2, 'Missing prefix: ' + address + '.');
  var prefix = pieces[0];
  var encodedPayload = pieces[1];
  (0, _validation.validate)(hasSingleCase(encodedPayload), 'Mixed case in address payload: ' + encodedPayload + '.');
  var payload = base32.decode(encodedPayload.toLowerCase());
  (0, _validation.validate)(validChecksum(prefix, payload), 'Invalid checksum: ' + address + '.');

  var _convertBits = (0, _convertBits4.default)(payload.slice(0, -8), 5, 8, true),
      _convertBits2 = _toArray(_convertBits),
      versionByte = _convertBits2[0],
      hash = _convertBits2.slice(1);

  (0, _validation.validate)(getHashSize(versionByte) === hash.length * 8, 'Invalid hash size: ' + address + '.');
  var type = getType(versionByte);
  return { prefix: prefix, type: type, hash: hash };
}

/**
 * 
 */
exports.ValidationError = _validation.ValidationError;

/***
 * Returns true if, and only if, the given string contains both uppercase
 * and lowercase letters.
 *
 * @param {string} string Input string. 
 */

function hasSingleCase(string) {
  var hasLowercase = false;
  var hasUppercase = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var letter = _step.value;

      hasLowercase = hasLowercase || letter !== letter.toUpperCase();
      hasUppercase = hasUppercase || letter !== letter.toLowerCase();
      if (hasLowercase && hasUppercase) {
        return false;
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

  return true;
}

/***
 * Returns the bit representation of the given type within the version
 * byte.
 *
 * @param {string} type Address type. Either 'P2PKH' or 'P2SH'.
 */
function getTypeBits(type) {
  switch (type) {
    case 'P2PKH':
      return 0;
    case 'P2SH':
      return 8;
    default:
      throw new _validation.ValidationError('Invalid type: ' + type + '.');
  }
}

/***
 * Retrieves the address type from its bit representation within the
 * version byte.
 *
 * @param {number} versionByte 
 */
function getType(versionByte) {
  switch (versionByte & 120) {
    case 0:
      return 'P2PKH';
    case 8:
      return 'P2SH';
    default:
      throw new _validation.ValidationError('Invalid address type in version byte: ' + versionByte + '.');
  }
}

/***
 * Returns the bit representation of the length in bits of the given
 * hash within the version byte.
 *
 * @param {Array} hash Hash to encode represented as an array of 8-bit integers.
 */
function getHashSizeBits(hash) {
  switch (hash.length * 8) {
    case 160:
      return 0;
    case 192:
      return 1;
    case 224:
      return 2;
    case 256:
      return 3;
    case 320:
      return 4;
    case 384:
      return 5;
    case 448:
      return 6;
    case 512:
      return 7;
    default:
      throw new _validation.ValidationError('Invalid hash size: ' + hash.length + '.');
  }
}

/***
 * Retrieves the the length in bits of the encoded hash from its bit
 * representation within the version byte.
 *
 * @param {number} versionByte 
 */
function getHashSize(versionByte) {
  switch (versionByte & 7) {
    case 0:
      return 160;
    case 1:
      return 192;
    case 2:
      return 224;
    case 3:
      return 256;
    case 4:
      return 320;
    case 5:
      return 384;
    case 6:
      return 448;
    case 7:
      return 512;
  }
}

/***
 * Derives an array from the given prefix to be used in the computation
 * of the address' checksum.
 *
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'. 
 */
function prefixToArray(prefix) {
  var result = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = prefix[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var letter = _step2.value;

      result.push(letter.charCodeAt(0) & 31);
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

  return result;
}

/***
 * Returns an array representation of the given checksum to be encoded
 * within the address' payload.
 *
 * @param {BigInteger} checksum Computed checksum.
 */
function checksumToArray(checksum) {
  var result = [];
  for (var i = 0; i < 8; ++i) {
    result.push(checksum.and(31).toJSNumber());
    checksum = checksum.shiftRight(5);
  }
  return result.reverse();
}

/***
 * Verify that the payload has not been corrupted by checking that the
 * checksum is valid.
 * 
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'.
 * @param {Array} payload Array of 5-bit integers containing the address' payload.
 */
function validChecksum(prefix, payload) {
  var prefixData = prefixToArray(prefix).concat([0]);
  return polymod(prefixData.concat(payload)).equals(0);
}

/***
 * Computes a checksum from the given input data as specified for the CashAddr
 * format: https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md.
 *
 * @param {Array} data Array of 5-bit integers over which the checksum is to be computed.
 */
function polymod(data) {
  var GENERATOR = [0x98f2bc8e61, 0x79b76d99e2, 0xf33e5fb3c4, 0xae2eabe2a8, 0x1e4f43e470];
  var checksum = (0, _bigInteger2.default)(1);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var value = _step3.value;

      var topBits = checksum.shiftRight(35);
      checksum = checksum.and(0x07ffffffff).shiftLeft(5).xor(value);
      for (var i = 0; i < GENERATOR.length; ++i) {
        if (topBits.shiftRight(i).and(1).equals(1)) {
          checksum = checksum.xor(GENERATOR[i]);
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return checksum.xor(1);
}