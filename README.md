# eCashAddr.js: The eCash address format for Node.js and web browsers.

[![NPM](https://nodei.co/npm/ecashaddrjs.png?downloads=true)](https://nodei.co/npm/ecashaddrjs/)

JavaScript implementation for CashAddr address format for eCash.

Compliant with the original CashAddr [specification](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md) which improves upon [BIP 173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki).

*Note:* This is a JavaScript implementation of the CashAddr format specification. If you are looking for a general purpose Bitcoin Cash address translation library, check out the easy-to-use and well-tested [BchAddr.js](https://github.com/ealmansi/bchaddrjs).

## Installation

### Using NPM

```bsh
$ npm install --save ecashaddrjs
```

### Using Bower

```bsh
$ bower install --save ecashaddrjs
```

### Manually

You may also download the distribution file manually and place it within your third-party scripts directory: [dist/cashaddrjs-1.0.3.min.js](https://unpkg.com/ecashaddrjs@1.0.3/dist/cashaddrjs-1.0.3.min.js).

## Usage

### In Node.js

```javascript
const ecashaddr = require('ecashaddrjs');
const address = 'ecash:qpm2qsznhks23z7629mms6s4cwef74vcwva87rkuu2';
const { prefix, type, hash } = ecashaddr.decode(address);
console.log(prefix); // 'ecash'
console.log(type); // 'P2PKH'
console.log(hash); // Uint8Array [ 118, 160, ..., 115 ]
console.log(cashaddr.encode(prefix, type, hash)); 
// 'ecash:qpm2qsznhks23z7629mms6s4cwef74vcwva87rkuu2'
```

*Note:* This is a JavaScript implementation of the CashAddr format specification. If you are looking for an easy-to-use and well-tested library to translate between different formats, check out [BchAddr.js](https://github.com/ealmansi/bchaddrjs).

### Browser

#### Script Tag

You may include a script tag in your HTML and the `ecashaddr` module will be defined globally on subsequent scripts.

```html
<html>
  <head>
    ...
    <script src="https://unpkg.com/ecashaddrjs@1.0.3/dist/cashaddrjs-1.0.3.min.js"></script>
  </head>
  ...
</html>
```

## Documentation

### Generate and Browse Locally

```bsh
$ npm run docs
```

### Online

Browse automatically generated jsdocs for cashaddrjs, which this is based on, [online](https://emilio.almansi.me/cashaddrjs/module-cashaddr.html).
