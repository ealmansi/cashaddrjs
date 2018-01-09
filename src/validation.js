/***
 * https://github.com/bitcoincashjs/cashaddr
 * Copyright (c) 2017 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

export class ValidationError extends Error {
} 

export function validate(condition, message) {
  if (!condition) {
    throw new ValidationError(message);
  }
}
