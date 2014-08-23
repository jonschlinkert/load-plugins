/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var resolve = require('resolve-dep');
var appname = require('app-name');
var _ = require('lodash');

/**
 * Load plugins using the given `patterns` and `options`.
 *
 * @param  {String} `patterns`
 * @param  {Object} `options`
 *     @option {Object} [options] `options`
 * @return {Object} Returns an object of loaded plugins.
 */

module.exports = function (patterns, options) {
  var opts = _.defaults({}, options, {
    strict: false, // resolve-dep
    require: false,
    strip: ['grunt', 'gulp', 'assemble', 'verb', 'handlebars', 'helper', 'plugin'],
    rename: rename
  });

  var plugins = {};
  resolve(patterns, opts).forEach(function (filepath) {
    var name = opts.rename(filepath, opts.strip);
    plugins[name] = opts.require ? require(filepath) : filepath;
  });
  return plugins;
};


function rename(filepath, names) {
  if (/node_modules/.test(filepath)) {
    var dir = path.relative(process.cwd(), filepath);
    dir = dir.split(/[\\\/]+/g);
    dir.shift();
    filepath = dir[0];
  } else {
    filepath = path.basename(filepath, path.extname(filepath));
  }
  return appname(filepath, names);
}
