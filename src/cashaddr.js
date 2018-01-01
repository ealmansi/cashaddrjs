/***
 * @license
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

const bigInt = require('big-integer');
const ensure = require('./ensure');
const base32 = require('./base32');
const convertBits = require('./convertBits');

/**
 * Encodes a hash from a given type into a Bitcoin Cash address with the given prefix.
 * 
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'.
 * @param {string} type Type of address to generate. Either 'P2KH' or 'P2SH'.
 * @param {Array} hash Hash to encode represented as an array of 8-bit integers.
 */
function encode(prefix, type, hash) {
  ensure(typeof prefix === 'string', `Invalid prefix: ${prefix}.`);
  ensure(typeof type === 'string', `Invalid type: ${type}.`);
  ensure(hash instanceof Array, `Invalid hash: ${hash}.`);
  const prefixData = prefixToArray(prefix).concat([0]);
  const versionByte = getTypeBits(type) + getHashSizeBits(hash);
  const payloadData = convertBits([versionByte].concat(hash), 8, 5);
  const checksumData = prefixData.concat(payloadData).concat(new Array(8).fill(0));
  const payload = payloadData.concat(checksumToArray(polymod(checksumData)));
  return `${prefix}:${base32.encode(payload)}`;
}

/**
 * Decodes the given address into its constituting prefix, type and hash. See [#encode()]{@link encode}.
 * 
 * @param {string} address Address to decode. E.g.: 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'.
 */
function decode(address) {
  ensure(typeof address === 'string', `Invalid address: ${address}.`);
  const pieces = address.split(':');
  ensure(pieces.length === 2, `Missing prefix: ${address}.`);
  const prefix = pieces[0];
  const encodedPayload = pieces[1];
  ensure(hasSingleCase(encodedPayload), `Mixed case in address payload: ${encodedPayload}.`);
  const payload = base32.decode(encodedPayload.toLowerCase());
  ensure(validChecksum(prefix, payload), `Invalid checksum: ${address}.`);
  const [versionByte, ...hash] = convertBits(payload.slice(0, -8), 5, 8, true);
  ensure(getHashSize(versionByte) === hash.length * 8, `Invalid hash size: ${address}.`);
  const type = getType(versionByte);
  return { prefix, type, hash };
}

/***
 * Returns true if, and only if, the given string contains both uppercase
 * and lowercase letters.
 *
 * @param {string} string Input string. 
 */
function hasSingleCase(string) {
  let hasLowercase = false;
  let hasUppercase = false;
  for (const letter of string) {
    hasLowercase = hasLowercase || letter !== letter.toUpperCase();
    hasUppercase = hasUppercase || letter !== letter.toLowerCase();
    if (hasLowercase && hasUppercase) {
      return false;
    }
  }
  return true;
}

/***
 * Returns the bit representation of the given type within the version
 * byte.
 *
 * @param {string} type Address type. Either 'P2KH' or 'P2SH'.
 */
function getTypeBits(type) {
  switch (type) {
  case 'P2KH':
    return 0;
  case 'P2SH':
    return 8;
  default:
    throw new Error(`Invalid type: ${type}.`);
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
    return 'P2KH';
  case 8:
    return 'P2SH';
  default:
    throw new Error(`Invalid address type in version byte: ${versionByte}.`);
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
    throw new Error(`Invalid hash size: ${hash.length}.`);
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
  const result = [];
  for (const letter of prefix) {
    result.push(letter.charCodeAt(0) & 31);
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
  const result = [];
  for (let i = 0; i < 8; ++i) {
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
  const prefixData = prefixToArray(prefix).concat([0]);
  return polymod(prefixData.concat(payload)).equals(0);
}

/***
 * Computes a checksum from the given input data as specified for the CashAddr
 * format: https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md.
 *
 * @param {Array} data Array of 5-bit integers over which the checksum is to be computed.
 */
function polymod(data) {
  const GENERATOR = [0x98f2bc8e61, 0x79b76d99e2, 0xf33e5fb3c4, 0xae2eabe2a8, 0x1e4f43e470];
  let checksum = bigInt(1);
  for (let value of data) {
    let topBits = checksum.shiftRight(35);
    checksum = checksum.and(0x07ffffffff).shiftLeft(5).xor(value);
    for (let i = 0; i < GENERATOR.length; ++i) {
      if (topBits.shiftRight(i).and(1).equals(1)) {
        checksum = checksum.xor(GENERATOR[i]);
      }
    }
  }
  return checksum.xor(1);
}

module.exports = {
  encode,
  decode,
};
