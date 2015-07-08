'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Utils
 */

var utils = module.exports;

utils.dirname = function dirname(fp) {
  return utils.isFile(fp) ? path.dirname(fp) : fp;
};

utils.basename = function basename(filepath) {
  return path.basename(filepath, utils.ext(filepath));
};

utils.segments = function segments(fp, from, to) {
  var segs = utils.relative(fp).split(/[\\\/]/g);
  return segs.slice(from, to).join('/');
};

utils.camelize = function camelize(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, first) {
    return first.toUpperCase();
  });
};

utils.relative = function relative(fp) {
  return path.relative(process.cwd(), fp);
};

utils.isFile = function isFile(fp) {
  return fs.statSync(fp).isFile();
};

utils.ext = function ext(filepath) {
  return path.extname(filepath);
};
