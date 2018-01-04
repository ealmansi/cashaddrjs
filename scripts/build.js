// https://github.com/bitcoincashjs/cashaddr
// Copyright (c) 2017 Emilio Almansi
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.

const version = require('../package.json').version;

const shell = require('shelljs');
shell.config.fatal = true;

shell.exec('mkdir -p lib dist')
shell.exec('npx babel src --out-dir lib')
shell.exec('npx browserify lib/cashaddr.js --s cashaddr', { silent:true })
    .exec('npx uglifyjs -c --comments', { silent:true })
    .to(`dist/cashaddrjs-${version}.min.js`);
shell.echo(`Generated file: dist/cashaddrjs-${version}.min.js.`)
