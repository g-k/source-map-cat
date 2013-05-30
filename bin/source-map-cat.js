#!/usr/bin/env node
'use strict';

var fs = require('fs');

var argparse = require('argparse');

var lib = require('../lib/index');


var parser = new argparse.ArgumentParser({
  version: require('../package.json').version,
  addHelp: true,
  description: "cat for JS source maps"
});

parser.addArgument(['-f', '--source-file'], {
  help: 'source file name',
  required: true
});

parser.addArgument(['source maps'], {
  help: 'source maps to concatenate',
  nargs: '*'
});


var args = parser.parseArgs(process.argv.slice(2));
lib.cat(args['source_file'], args['source maps'], process.stdout);
