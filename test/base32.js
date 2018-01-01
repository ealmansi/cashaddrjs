/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

/* global describe it */

const Random = require('random-js');
const assert = require('chai').assert;
const base32 = require('../src/base32');

describe('base32', () => {

  const random = new Random(Random.engines.mt19937().seed(42));

  function getRandomData(size) {
    const data = [];
    for (let i = 0; i < size; ++i) {
      data.push(random.integer(0, 31));
    }
    return data;
  }

  describe('#encode()', () => {
    it('should fail on invalid input', () => {
      const INVALID_INPUTS = [
        undefined,
        'some string',
        1234.567,
      ];
      for (const input of INVALID_INPUTS) {
        assert.throws(() => base32.encode(input));
      }
    });

    it('should encode single digits correctly', () => {
      for (let i = 0; i < base32.CHARSET; ++i) {
        assert.equal(base32.CHARSET[i], base32.encode([i]));
      }
    });
  });

  describe('#decode()', () => {
    it('should fail on invalid input', () => {
      const INVALID_INPUTS = [
        undefined,
        1234.567,
        [1, 2, 3, 4],
        'b',
      ];
      for (const input of INVALID_INPUTS) {
        assert.throws(() => base32.decode(input));
      }
    });

    it('should decode single digits correctly', () => {
      for (let i = 0; i < base32.CHARSET; ++i) {
        assert.equal(i, base32.decode(base32.CHARSET[i]));
      }
    });
  });

  describe('#encode() #decode()', () => {
    it('should encode and decode random data correctly', () => {
      const NUM_TESTS = 2000;
      for (let i = 0; i < NUM_TESTS; ++i) {
        const data = getRandomData(1000);
        assert.deepEqual(base32.decode(base32.encode(data)), data);
      }
    });
  });
});
