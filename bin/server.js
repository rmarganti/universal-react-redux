#!/usr/bin/env node
const cssModulesRequireHook = require('css-modules-require-hook');
const fs                    = require('fs');
const path                  = require('path');
const sass                  = require('node-sass');

/**
 * Enable babel transpilation on server
 */
const babelrc = fs.readFileSync('./.babelrc');
let babelConfig;

try {
    babelConfig = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}
require('babel-register')(babelConfig);

/**
 * Define universal-rendering constants
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('../src/server');
