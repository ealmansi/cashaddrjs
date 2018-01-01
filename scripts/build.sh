# https://github.com/bitcoincashjs/cashaddr
# Copyright (c) 2017 Emilio Almansi
# Distributed under the MIT software license, see the accompanying
# file LICENSE or http://www.opensource.org/licenses/mit-license.php.

list=$(npm list | grep cashaddr)
cashaddr=${list% *}
version=${cashaddr#*@}

npm install \
  && npx browserify src/cashaddr.js --s cashaddr -t [ babelify --presets [ env ] ] \
  | npx uglifyjs -c --comments \
  > dist/cashaddr-${version}.min.js
