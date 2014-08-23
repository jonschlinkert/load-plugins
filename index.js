/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var resolve = require('resolve-dep');
var _ = require('lodash');

var regex = /(grunt|gulp|assemble|verb|handlebars|helper|plugin)-/;


module.exports = function (patterns, options) {
  var opts = _.defaults({}, options, {
    strict: true, // resolve-dep
    require: false,
    regex: regex,
    pathFn: pathFn
  });

  var dirpath = path.join(process.cwd(), 'node_modules');
  var plugins = {};

  resolve(patterns, _.pick(opts, 'strict')).forEach(function (filepath) {
    var name = pathFn(dirpath, filepath, regex);
    plugins[name] = opts.require ? require(filepath) : filepath;
  });

  return plugins;
};


function pathFn(initial, filepath, re) {
  return path.normalize(filepath)
    .replace(path.normalize(initial), '')
    .replace(/^[\\\/]/, '').split(/[\\\/]/)[0]
    .replace(re, '');
};
