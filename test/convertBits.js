/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

/* global describe it */

const Random = require('random-js');
const assert = require('chai').assert;
const convertBits = require('../src/convertBits');

describe('#convertBits()', () => {

  const random = new Random(Random.engines.mt19937().seed(42));

  function getRandomData(size, max) {
    const data = [];
    for (let i = 0; i < size; ++i) {
      data.push(random.integer(0, max));
    }
    return data;
  }

  it('should fail if it receives an invalid value', () => {
    assert.throws(() => {
      convertBits([100], 5, 8);
    });
  });

  it('should fail in strict mode if padding is needed', () => {
    const data = getRandomData(10, 31);
    assert.throws(() => {
      convertBits(data, 5, 8, true);
    });
  });

  it('should convert both ways successfully', () => {
    const data1 = getRandomData(80, 31);
    assert.deepEqual(
      convertBits(convertBits(data1, 5, 8), 8, 5),
      data1
    );
    const data2 = getRandomData(80, 255);
    assert.deepEqual(
      convertBits(convertBits(data2, 8, 5), 5, 8),
      data2
    );
  });
});
