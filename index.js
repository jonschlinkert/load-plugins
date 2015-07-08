/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var appname = require('app-name');
var resolve = require('resolve-dep');
var extend = require('extend-shallow');
var utils = require('./lib/utils');
var registry = require('./lib/registry')

/**
 * Expose `plugins`
 */

module.exports = plugins;

/**
 * Load plugins from `node_modules` or a local directory.
 *
 * ```js
 * var plugins = require('load-plugins')('gulp-*');
 * var jshint = plugins['gulp-jshint'];
 * var mocha = plugins['gulp-mocha'];
 * ```
 *
 * @param  {String} `patterns` Glob pattern to use.
 * @param  {String} `options`
 * @return {String}
 */

function plugins(patterns, options) {
  var opts = extend({
    strict: true,
    camelize: true,
    strip: registry.strip
  }, options);
  var files = resolve(patterns, opts);

  return files.reduce(function (cache, fp) {
    var key = rename(fp, opts);
    cache[key] = req(fp, opts);
    return cache;
  }, {});
}

/**
 * Default `require` function. Pass a custom function to
 * `options.require` to override.
 *
 * @param  {String} filepath
 * @param  {String} `options`
 * @return {String}
 */

function req(filepath, options) {
  if (options.require) {
    return options.require(filepath, options);
  }
  var fp = path.resolve(filepath);
  return require(fp);
}

/**
 * Rename function. Pass a custom function to `options.name` to change behavior.
 *
 *   - Detect if the path is in node_modules, if so use the name of the module.
 *   - If not, use the name of file.
 *   - If the file name is `index`, use the last directory segment.
 *
 * Of course, these are best guesses. If you use a wierd directory
 * structure for your plugins, it's probably a good idea to use a
 * custom renaming function.
 *
 * @param  {String} `filepath`
 * @return {String}
 */

function rename(filepath, options) {
  var name;

  filepath = utils.relative(filepath);

  if (/node_modules/.test(filepath)) {
    name = utils.segments(filepath, 1, 2);
  } else {
    name = utils.basename(filepath);
  }

  if (name === 'index') {
    name = utils.segments(filepath, -2)[0];
  }

  var str = appname(name, options.strip);
  if (options.camelize) {
    return utils.camelize(str);
  }
  return str;
}
