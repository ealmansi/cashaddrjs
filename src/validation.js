
/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

/**
 * Error thrown when encoding or decoding fail due to invalid input.
 *
 * @constructor ValidationError
 * @param {string} message Error description.
 */
export function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
  this.stack = (new Error()).stack;
}

ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.constructor = ValidationError;

ValidationError.prototype.toString = function() {
  return `${this.name}: ${this.message}.`;
};

/**
 * Validates a given condition, throwing a {@link ValidationError} if
 * the given condition does not hold.
 *
 * @param {boolean} condition Condition to validate.
 * @param {string} message Error message in case the condition does not hold.
 */
export function validate(condition, message) {
  if (!condition) {
    throw new ValidationError(message);
  }
}
