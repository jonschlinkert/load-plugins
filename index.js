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
var fileName = require('file-name');
var lazyCache = require('lazy-cache');
var camelize = require('camelcase');

/**
 * Expose `plugins`
 */

module.exports = plugins;

/**
 * Load plugins from `node_modules` or a local directory.
 *
 * ```js
 * var plugins = require('load-plugins')('gulp-*');
 * var jshint = plugins.gulpJshint;
 * var mocha = plugins.gulpMocha;
 * ```
 *
 * @param  {String} `patterns` Glob pattern to use.
 * @param  {String} `options`
 * @return {Object}
 */

function plugins(patterns, options) {
  var opts = extend({
    strict: true,
    camelize: true,
    strip: false,
    rename: false,
    require: false,
    lazy: true
  }, options);
  if (typeof opts.require !== 'function') {
    opts.require = require;
  }
  var lazy = lazyCache(opts.require);
  var cache = {};

  resolve(patterns, opts).forEach(function (filepath) {
    var name = rename(filepath, opts);
    if (opts.lazy) {
      lazy(filepath, name);
    } else {
      cache[name] = opts.require(filepath, opts);
    }
  });

  return opts.lazy ? lazy : cache;
}


/**
 * Rename function. Pass a custom function to `options.rename` to change behavior.
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
  var segments;
  var name;
  filepath = path.relative(process.cwd(), filepath);
  segments = filepath.split(path.sep).slice(0, -1);
  name = fileName(filepath);

  if (segments.indexOf('node_modules') !== -1) {
    name = segments[1];
  } else if (name === 'index' && segments.length) {
    name = segments[segments.length - 1];
  }

  if (typeof options.rename === 'function') {
    name = options.rename(name);
  } else {
    if (options.strip) {
      name = appname(name, options.strip);
    }
    if (options.camelize) {
      name = camelize(name);
    }
  }

  return name;
}
