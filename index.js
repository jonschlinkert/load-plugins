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
    camelize: true,
    strip: false,
    rename: false,
    require: false
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
  if (typeof options.require === 'function') {
    return options.require(filepath, options);
  }
  return require(path.resolve(filepath));
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
  var file = path.parse(filepath);
  var segments = path.relative(process.cwd(), file.dir).split(path.sep);
  var name;

  if (segments.indexOf('node_modules') !== -1) {
    name = segments[1];
  } else {
    name = file.name;
    if (name === 'index' && segments.length) {
      name = segments[segments.length - 1];
    }
  }

  if (typeof options.rename === 'function') {
    name = options.rename(name);
  } else {
    name = options.strip ? appname(name, options.strip) : name;
    if (options.camelize) {
      return camelize(name);
    }
  }

  return name;
}


function camelize(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, first) {
    return first.toUpperCase();
  });
}
