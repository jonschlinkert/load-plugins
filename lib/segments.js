'use strict';

var relative = require('./relative');

module.exports = function segments(fp, from, to) {
  var segs = relative(fp).split(/[\\\/]/g);
  return segs.slice(from, to).join('/');
};