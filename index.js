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
var camelize = require('./lib/camelize');
var segments = require('./lib/segments');
var basename = require('./lib/basename');
var excludes = require('./lib/excludes');
var relative = require('./lib/relative');
var expand = require('./lib/expand');
var extend = require('./lib/extend');

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
  var files = resolve(patterns, extend({strict: true}, options));

  return files.reduce(function (cache, filepath) {
    var key = rename(filepath, options);
    cache[key] = req(filepath, options);
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
  var opts = extend({}, options);
  if (opts.require) {
    return opts.require(filepath, opts);
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
  var opts = extend({strip: excludes}, options);
  var name;

  filepath = relative(filepath);

  if (/node_modules/.test(filepath)) {
    name = segments(filepath, 1, 2);
  } else {
    name = basename(filepath);
  }

  if (name === 'index') {
    name = segments(filepath, -2)[0];
  }

  var str = appname(name, expand(opts.strip));
  if (opts.camelize) {
    return camelize(str);
  }
  return str;
}


module.exports = plugins;
