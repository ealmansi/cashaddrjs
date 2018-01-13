
/***
 * @license
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

import { validate } from './validation';
import * as base32 from './base32';
import * as validation from './validation';
import bigInt from 'big-integer';
import convertBits from './convertBits';

const VALID_PREFIXES = ['bitcoincash', 'bchtest', 'bchreg'];

/**
 * Encoding and decoding of the new Cash Address format for Bitcoin Cash. <br />
 * Compliant with the original cashaddr specification:
 * {@link https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md}
 * @module cashaddr
 */

/**
 * Error thrown when encoding or decoding fail due to invalid input.
 *
 * @constructor ValidationError
 * @param {string} message Error description.
 */
export const ValidationError = validation.ValidationError;

/**
 * Encodes a hash from a given type into a Bitcoin Cash address with the given prefix.
 * Throws a {@link ValidationError} if input is invalid.
 * 
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'.
 * @param {string} type Type of address to generate. Either 'P2PKH' or 'P2SH'.
 * @param {Uint8Array} hash Hash to encode represented as an array of 8-bit integers.
 * @returns {string}
 */
export function encode(prefix, type, hash) {
  validate(typeof prefix === 'string' && isValidPrefix(prefix), `Invalid prefix: ${prefix}.`);
  validate(typeof type === 'string', `Invalid type: ${type}.`);
  validate(hash instanceof Uint8Array, `Invalid hash: ${hash}.`);
  const prefixData = concat(prefixToUint5Array(prefix), new Uint8Array(1));
  const versionByte = getTypeBits(type) + getHashSizeBits(hash);
  const payloadData = toUint5Array(concat(Uint8Array.of(versionByte), hash));
  const checksumData = concat(concat(prefixData, payloadData), new Uint8Array(8));
  const payload = concat(payloadData, checksumToUint5Array(polymod(checksumData)));
  return `${prefix}:${base32.encode(payload)}`;
}

/**
 * Decodes the given address into its constituting prefix, type and hash. See [#encode()]{@link encode}.
 * Throws a {@link ValidationError} if input is invalid.
 *
 * @param {string} address Address to decode. E.g.: 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'.
 * @returns {object}
 */
export function decode(address) {
  validate(typeof address === 'string' && hasSingleCase(address), `Invalid address: ${address}.`);
  const pieces = address.toLowerCase().split(':');
  validate(pieces.length === 2, `Missing prefix: ${address}.`);
  const prefix = pieces[0];
  const payload = base32.decode(pieces[1]);
  validate(validChecksum(prefix, payload), `Invalid checksum: ${address}.`);
  const payloadData = fromUint5Array(payload.slice(0, -8));
  const versionByte = payloadData[0];
  const hash = payloadData.slice(1);
  validate(getHashSize(versionByte) === hash.length * 8, `Invalid hash size: ${address}.`);
  const type = getType(versionByte);
  return { prefix, type, hash };
}

/**
 * Checks whether a string is a valid prefix; ie., it has a single letter case
 * and is one of 'bitcoincash', 'bchtest', or 'bchreg'.
 *
 * @private
 * @param {string} prefix 
 * @returns {boolean}
 */
function isValidPrefix(prefix) {
  return hasSingleCase(prefix) && VALID_PREFIXES.includes(prefix.toLowerCase());
}

/**
 * Derives an array from the given prefix to be used in the computation
 * of the address' checksum.
 *
 * @private
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'. 
 * @returns {Uint8Array}
 */
function prefixToUint5Array(prefix) {
  const result = new Uint8Array(prefix.length);
  for (let i = 0; i < prefix.length; ++i) {
    result[i] = prefix[i].charCodeAt(0) & 31;
  }
  return result;
}

/**
 * Returns an array representation of the given checksum to be encoded
 * within the address' payload.
 *
 * @private
 * @param {BigInteger} checksum Computed checksum.
 * @returns {Uint8Array}
 */
function checksumToUint5Array(checksum) {
  const result = new Uint8Array(8);
  for (let i = 0; i < 8; ++i) {
    result[i] = checksum.and(31).toJSNumber();
    checksum = checksum.shiftRight(5);
  }
  return result.reverse();
}

/**
 * Returns the bit representation of the given type within the version
 * byte.
 * Throws a {@link ValidationError} if input is invalid.
 *
 * @private
 * @param {string} type Address type. Either 'P2PKH' or 'P2SH'.
 * @returns {number}
 */
function getTypeBits(type) {
  switch (type) {
  case 'P2PKH':
    return 0;
  case 'P2SH':
    return 8;
  default:
    throw new ValidationError(`Invalid type: ${type}.`);
  }
}

/**
 * Retrieves the address type from its bit representation within the
 * version byte.
 * Throws a {@link ValidationError} if input is invalid.
 *
 * @private
 * @param {number} versionByte
 * @returns {string}
 */
function getType(versionByte) {
  switch (versionByte & 120) {
  case 0:
    return 'P2PKH';
  case 8:
    return 'P2SH';
  default:
    throw new ValidationError(`Invalid address type in version byte: ${versionByte}.`);
  }
}

/**
 * Returns the bit representation of the length in bits of the given
 * hash within the version byte.
 * Throws a {@link ValidationError} if input is invalid.
 *
 * @private
 * @param {Uint8Array} hash Hash to encode represented as an array of 8-bit integers.
 * @returns {number}
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
    throw new ValidationError(`Invalid hash size: ${hash.length}.`);
  }
}

/**
 * Retrieves the the length in bits of the encoded hash from its bit
 * representation within the version byte.
 *
 * @private
 * @param {number} versionByte
 * @returns {number}
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

/**
 * Converts an array of 8-bit integers into an array of 5-bit integers,
 * right-padding with zeroes if necessary.
 *
 * @private
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
function toUint5Array(data) {
  return convertBits(data, 8, 5);
}

/**
 * Converts an array of 5-bit integers back into an array of 8-bit integers,
 * removing extra zeroes left from padding if necessary.
 * Throws a {@link ValidationError} if input is not a zero-padded array of 8-bit integers.
 *
 * @private
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
function fromUint5Array(data) {
  return convertBits(data, 5, 8, true);
}

/**
 * Returns the concatenation a and b.
 *
 * @private
 * @param {Uint8Array} a 
 * @param {Uint8Array} b 
 * @returns {Uint8Array}
 */
function concat(a, b) {
  const ab = new Uint8Array(a.length + b.length);
  ab.set(a);
  ab.set(b, a.length);
  return ab;
}

/**
 * Computes a checksum from the given input data as specified for the CashAddr
 * format: https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md.
 *
 * @private
 * @param {Uint8Array} data Array of 5-bit integers over which the checksum is to be computed.
 * @returns {BigInteger}
 */
function polymod(data) {
  const GENERATOR = [0x98f2bc8e61, 0x79b76d99e2, 0xf33e5fb3c4, 0xae2eabe2a8, 0x1e4f43e470];
  let checksum = bigInt(1);
  for (const value of data) {
    const topBits = checksum.shiftRight(35);
    checksum = checksum.and(0x07ffffffff).shiftLeft(5).xor(value);
    for (let i = 0; i < GENERATOR.length; ++i) {
      if (topBits.shiftRight(i).and(1).equals(1)) {
        checksum = checksum.xor(GENERATOR[i]);
      }
    }
  }
  return checksum.xor(1);
}

/**
 * Verify that the payload has not been corrupted by checking that the
 * checksum is valid.
 * 
 * @private
 * @param {string} prefix Network prefix. E.g.: 'bitcoincash'.
 * @param {Uint8Array} payload Array of 5-bit integers containing the address' payload.
 * @returns {boolean}
 */
function validChecksum(prefix, payload) {
  const prefixData = concat(prefixToUint5Array(prefix), new Uint8Array(1));
  const checksumData = concat(prefixData, payload);
  return polymod(checksumData).equals(0);
}

/**
 * Returns true if, and only if, the given string contains either uppercase
 * or lowercase letters, but not both.
 *
 * @private
 * @param {string} string Input string.
 * @returns {boolean}
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
