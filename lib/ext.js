'use strict';

/**
 * Module dependencies
 */

var path = require('path');

module.exports = function ext(filepath) {
  return path.extname(filepath);
};
