
/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

/* global describe it */

import { assert } from 'chai';
import { ValidationError } from '../src/validation';
import * as cashaddr from '../src/cashaddr';
import Random from 'random-js';

describe('cashaddr', () => {

  const NETWORKS = ['bitcoincash', 'bchtest', 'bchreg'];
  
  const ADDRESS_TYPES = ['P2PKH', 'P2SH'];
  
  const VALID_SIZES = [20, 24, 28, 32, 40, 48, 56, 64];

  const TEST_HASHES = [
    Uint8Array.of(118, 160, 64,  83, 189, 160, 168, 139, 218, 81, 119, 184, 106, 21, 195, 178, 159, 85,  152, 115),
    Uint8Array.of(203, 72, 18, 50, 41,  156, 213, 116, 49,  81, 172, 75, 45, 99, 174, 25,  142, 123, 176, 169),
    Uint8Array.of(1,   31, 40,  228, 115, 201, 95, 64,  19,  215, 213, 62, 197, 251, 195, 180, 45, 248, 237, 16),
  ];
  
  const EXPECTED_P2PKH_OUTPUTS = [
    'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a',
    'bitcoincash:qr95sy3j9xwd2ap32xkykttr4cvcu7as4y0qverfuy',
    'bitcoincash:qqq3728yw0y47sqn6l2na30mcw6zm78dzqre909m2r',
  ];

  const EXPECTED_P2SH_OUTPUTS = [
    'bitcoincash:ppm2qsznhks23z7629mms6s4cwef74vcwvn0h829pq',
    'bitcoincash:pr95sy3j9xwd2ap32xkykttr4cvcu7as4yc93ky28e',
    'bitcoincash:pqq3728yw0y47sqn6l2na30mcw6zm78dzq5ucqzc37', 
  ];

  const EXPECTED_P2PKH_OUTPUTS_TESTNET = [
    'bchtest:qpm2qsznhks23z7629mms6s4cwef74vcwvqcw003ap',
    'bchtest:qr95sy3j9xwd2ap32xkykttr4cvcu7as4ytjg7p7mc',
    'bchtest:qqq3728yw0y47sqn6l2na30mcw6zm78dzq8tpg8vdl',
  ];

  const EXPECTED_P2SH_OUTPUTS_TESTNET = [
    'bchtest:ppm2qsznhks23z7629mms6s4cwef74vcwvhanqgjxu',
    'bchtest:pr95sy3j9xwd2ap32xkykttr4cvcu7as4yuh43xaq9',
    'bchtest:pqq3728yw0y47sqn6l2na30mcw6zm78dzqswu8q0kz',
  ];

  const random = new Random(Random.engines.mt19937().seed(42));

  function getRandomHash(size) {
    const hash = new Uint8Array(size);
    for (let i = 0; i < size; ++i) {
      hash[i] = random.integer(0, 255);
    }
    return hash;
  }

  describe('#encode()', () => {
    it('should fail on an invalid type', () => {
      assert.throws(() => {
        cashaddr.encode(NETWORKS[0], 'some invalid type', Uint8Array.of());
      }, ValidationError);
    });

    it('should fail on hashes of invalid length', () => {
      for (const size of VALID_SIZES) {
        const hash = getRandomHash(size - 1);
        assert.throws(() => {
          cashaddr.encode(NETWORKS[0], ADDRESS_TYPES[0], hash);
        }, ValidationError);
      }
    });

    it('should encode test hashes on mainnet correctly', () => {
      for (const index in TEST_HASHES) {
        assert.equal(
          cashaddr.encode('bitcoincash', 'P2PKH', TEST_HASHES[index]),
          EXPECTED_P2PKH_OUTPUTS[index]
        );
        assert.equal(
          cashaddr.encode('bitcoincash', 'P2SH', TEST_HASHES[index]),
          EXPECTED_P2SH_OUTPUTS[index]
        );
      }
    });

    it('should encode test hashes on testnet correctly', () => {
      for (const index in TEST_HASHES) {
        assert.equal(
          cashaddr.encode('bchtest', 'P2PKH', TEST_HASHES[index]),
          EXPECTED_P2PKH_OUTPUTS_TESTNET[index]
        );
        assert.equal(
          cashaddr.encode('bchtest', 'P2SH', TEST_HASHES[index]),
          EXPECTED_P2SH_OUTPUTS_TESTNET[index]
        );
      }
    });
  });

  describe('#decode()', () => {
    it('should fail when the version byte is invalid', () => {
      assert.throws(() => {
        cashaddr.decode('bitcoincash:zpm2qsznhks23z7629mms6s4cwef74vcwvrqekrq9w');
      }, ValidationError);
    });

    it('should fail when given an address with mixed case', () => {
      assert.throws(() => {
        cashaddr.decode('BitCOINcash:QPM2QSZNHKS23Z7629MMS6s4cwef74vcwvY22GDX6A');
      }, ValidationError);
    });

    it('should decode a valid address regardless of case', () => {
      assert.deepEqual(
        cashaddr.decode('bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a').hash,
        cashaddr.decode('BITCOINCASH:QPM2QSZNHKS23Z7629MMS6S4CWEF74VCWVY22GDX6A').hash
      );
    });
    
    it('should fail when decoding for a different network', () => {
      for (const network of NETWORKS) {
        for (const anotherNetwork of NETWORKS) {
          if (network !== anotherNetwork) {
            const hash = getRandomHash(20);
            assert.throws(() => {
              const address = cashaddr.encode(network, ADDRESS_TYPES[0], hash);
              const invalidAddress = [anotherNetwork, address.split(':')[1]].join(':');
              cashaddr.decode(invalidAddress);
            }, ValidationError);
          }
        } 
      }
    });
  });
  
  describe('#encode() #decode()', () => {
    it('should encode and decode all sizes correctly', () => {
      for (const size of VALID_SIZES) {
        const hash = getRandomHash(size);
        const address = cashaddr.encode(NETWORKS[0], ADDRESS_TYPES[0], hash);
        const { prefix, type, hash: actualHash } = cashaddr.decode(address);
        assert.equal(prefix, NETWORKS[0]);
        assert.equal(type, ADDRESS_TYPES[0]);
        assert.deepEqual(actualHash, hash);
      }
    });
  
    it('should encode and decode all types and networks', () => {
      for (const type of ADDRESS_TYPES) {
        for (const network of NETWORKS) {
          const hash = getRandomHash(20);
          const address = cashaddr.encode(network, type, hash);
          const { prefix, type: actualType, hash: actualHash } = cashaddr.decode(address);
          assert.equal(prefix, network);
          assert.equal(actualType, type);
          assert.deepEqual(actualHash, hash);
        }
      }
    });
  
    it('should encode and decode many random hashes', () => {
      const NUM_TESTS = 1000;
      for (let i = 0; i < NUM_TESTS; ++i) {
        for (const type of ADDRESS_TYPES) {
          const hash = getRandomHash(20);
          const address = cashaddr.encode(NETWORKS[0], type, hash);
          const { prefix, type: actualType, hash: actualHash } = cashaddr.decode(address);
          assert.equal(prefix, NETWORKS[0]);
          assert.equal(actualType, type);
          assert.deepEqual(actualHash, hash);
        }
      }
    });
  });
});
