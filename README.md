# It is a fork fixing the old JavaScript engine
Original repository is : [bitcoincashjs/bchaddrjs](https://github.com/bitcoincashjs/bchaddrjs)

# CashAddr.js: The new Bitcoin Cash address format for Node.js and web browsers.

[![NPM](https://nodei.co/npm/cashaddrjs-fork.png?downloads=true)](https://nodei.co/npm/cashaddrjs-fork/)

JavaScript implementation for the new CashAddr address format for Bitcoin Cash.

Compliant with the original CashAddr [specification](https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md) which improves upon [BIP 173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki).

*Note:* This is a JavaScript implementation of the CashAddr format specification. If you are looking for a general purpose Bitcoin Cash address translation library, check out the easy-to-use and well-tested [BchAddr.js](https://github.com/jbdtky/bchaddrjs).

## Installation

### Using NPM

```bsh
$ npm install --save cashaddrjs-fork
```

## Usage

### In Node.js

```javascript
const cashaddr = require('cashaddrjs-fork');
const address = 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a';
const { prefix, type, hash } = cashaddr.decode(address);
console.log(prefix); // 'bitcoincash'
console.log(type); // 'P2PKH'
console.log(hash); // Uint8Array [ 118, 160, ..., 115 ]
console.log(cashaddr.encode(prefix, type, hash)); // 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'
```

*Note:* This is a JavaScript implementation of the CashAddr format specification. If you are looking for an easy-to-use and well-tested library to translate between different formats, check out [BchAddr.js](https://github.com/jbdtky/bchaddrjs).
