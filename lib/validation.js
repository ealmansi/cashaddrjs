'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = ValidationError;
exports.validate = validate;
/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
  this.stack = new Error().stack;
}

ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.constructor = ValidationError;

ValidationError.prototype.toString = function () {
  return this.name + ': ' + this.message + '.';
};

function validate(condition, message) {
  if (!condition) {
    throw new ValidationError(message);
  }
}