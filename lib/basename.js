'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var ext = require('./ext');

module.exports = function basename(filepath) {
  return path.basename(filepath, ext(filepath));
};
