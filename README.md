# CashAddr.js: The new Bitcoin Cash address format for Node.js and web browsers.

[![Build Status](https://travis-ci.org/bitcoincashjs/cashaddrjs.svg?branch=master)](https://travis-ci.com/bitcoincashjs/cashaddrjs)

JavaScript implementation for the new CashAddr address format for Bitcoin Cash. Compliant with the original CashAddr [specification](https://github.com/Bitcoin-UAHF/spec/blob/master/cashaddr.md) which improves upon [BIP 173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki).

## Installation

`$ npm install --save cashaddrjs`

## Usage

### In Node.js

```javascript
const cashaddr = require('cashaddrjs');

const hash = [
  118, 160, 64,  83, 189,
  160, 168, 139, 218, 81,
  119, 184, 106, 21, 195,
  178, 159, 85,  152, 115
];
const address = cashaddr.encode('bitcoincash', 'P2KH', hash);

console.log(address);
// 'bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a'

console.log(cashaddr.decode(address))
// { prefix: 'bitcoincash',
//   type: 'P2KH',
//   hash: 
//   [ 118,
//     ...
//     115 ] }
```

### Browser

#### Script Tag

```html
<html>
  <head>
    ...
    <script src="https://cdn.rawgit.com/bitcoincashjs/cashaddrjs/master/dist/cashaddrjs-0.1.0.min.js"></script>
  </head>
  ...
</html>
```

## Documentation

### Generate and Browse Locally

```
$ npm run docs
```

### Online

Browse automatically generated jsdocs [online](https://cdn.rawgit.com/bitcoincashjs/cashaddrjs/master/docs/global.html#encode).
