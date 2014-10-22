'use strict';

var path = require('path');

module.exports = function relative(fp) {
  return path.relative(process.cwd(), fp);
};
