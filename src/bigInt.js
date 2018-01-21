/**
 * @license
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017-2018 Emilio Almansi + DesWurstes
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

'use strict';

/**
 * Big integer processing, for polyMod.
 * Big numbers are declared as big endian arrays
 * e.g. 0xabcabcabca is [0xab, 0xcabcabca]
 * @module bigInt
 */

/**
 * Left shifts the whole number by five.
 * @param  {bigInt} a bigInt array
 * @return {bigInt}   Left shifted bigInt array
 */
function lShiftByFive(a) {
  a = [0].concat(a);
  for (var i = 1; i < a.length; i++) {
    a[i - 1] |= a[i] >>> 27;
    a[i] <<= 5;
  }
  return a;
}

/**
 * Left shifts the whole number by five.
 * @param  {bigInt} a bigInt array
 * @param  {integer} b Right shift by? must be between 0 and 35 (inclusive)
 * @return {bigInt}   Right shifted bigInt array
 */
function rShift(a, b) {
  // Arrays are pass by reference
  var t = a.slice(0);
  if (t.length === 0) {
    return [0];
  }
  if (b > 31) {
    t = a.slice(0, -1);
    b -= 32;
  }
  if (b === 0) {
    return t;
  }
  for (var i = t.length - 1; i > 0; i--) {
    t[i] >>>= b;
    t[i] |= (t[i - 1] & ((2 << (b + 1)) - 1)) << (32 - b);
  }
  t[0] >>>= b;
  if (t[0] === 0) {
    return t.slice(1);
  }
  return t;
}

/**
 * XORs two bigInt arrays
 * @param  {bigInt} a XOR input bigInt array
 * @param  {bigInt} b XOR input bigInt array
 * @return {bigInt} XOR output bigInt array
 */
function xor(a, b) {
  var t = a.length - b.length;
  var c = [];
  if (t > 0) {
    b = Array(t)
      .fill(0)
      .concat(b);
  } else if (t < 0) {
    a = Array(-t)
      .fill(0)
      .concat(a);
  }
  for (var i = 0; i < a.length; i++) {
    c.push(a[i] ^ b[i]);
  }
  return c;
}

/**
 * ANDs two bigInt arrays
 * @param  {bigInt} a AND input bigInt array
 * @param  {bigInt} b AND input bigInt array
 * @return {bigInt}   AND output bigInt array
 */
function and(a, b) {
  var t = a.length - b.length;
  var c = [];
  if (t >= 0) {
    for (var i = 0; i < b.length; i++) {
      c.push(a[i + t] & b[i]);
    }
  } else {
    for (var z = 0; z < a.length; z++) {
      c.push(a[z] & b[z - t]);
    }
  }
  return c;
}

/**
 * Simplifies a bigInt array by removing unneeded zeros.
 * e.g. [0,0,7,0] => [7,0]
 * @param  {bigInt} a Simplification input bigInt array
 * @return {bigInt}   Simplification input bigInt array
 */
function simplify(a) {
  if (a.length === 0) {
    return [0];
  }
  var i = 0;
  while (a[i] === 0 && i < a.length - 1) {
    i++;
  }
  var z = a.slice(i);
  if (z.length === 0) {
    z = [0];
  }
  return z;
}

/**
 * Is the bigInt zero?
 * @param  {bigInt} a bigInt array
 * @return {Boolean} whether it's equal to zero
 */
function isZero(a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== 0) {
      return false;
    }
  }
  return true;
}

module.exports = {
  lShiftByFive: lShiftByFive,
  rShift: rShift,
  xor: xor,
  and: and,
  simplify: simplify,
  isZero: isZero,
};
