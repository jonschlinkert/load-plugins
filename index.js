/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var resolve = require('resolve-dep');
var isAbsolute = require('is-absolute');
var _ = require('lodash');

var names = ['grunt', 'gulp', 'assemble', 'verb', 'handlebars', 'helper', 'plugin'];
var list = '(' + names.join('|') + ')';
var re = new RegExp(list + '[^\\\\\/]*', 'g');

function rename(filepath, re) {
  var name = path.relative(process.cwd(), filepath);
  if (/node_modules/.test(name)) {
    name = name.match(re)[0];
    var res = new RegExp(list + '-');
    name = name.replace(res, '');
  } else {
    name = path.basename(name, path.extname(name));
  }
  return name;
};

module.exports = function (patterns, options) {
  var opts = _.defaults({}, options, {
    strict: false, // resolve-dep
    require: false,
    regex: re
  });

  var plugins = {};

  resolve(patterns, opts).forEach(function (filepath) {
    var name = rename(filepath, opts.regex);
    plugins[name] = opts.require ? require(filepath) : filepath;
  });

  return plugins;
};

