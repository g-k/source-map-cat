#!/usr/bin/env node
'use strict';

var coffee = require("coffee-script");
var path = require('path');
var fs = require('fs');

var projectRoot = path.dirname(path.dirname(module.filename));

// ../lib/cli
var cliPath = path.join(projectRoot, 'lib', 'cli');

require(cliPath)(process.argv);
