/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var plugins = require('..');
var resolve = require('resolve-dep');

describe('plugins', function () {
  it('should load plugins from node_modules', function () {
    var actual = plugins('gulp-*');
    Object.keys(actual).length.should.equal(2);
  });

  it('should load plugins from node_modules', function () {
    var actual = plugins('verb-*');
    Object.keys(actual).length.should.equal(1);
  });

  it('should load plugins from node_modules', function () {
    var actual = plugins('verb*');
    Object.keys(actual).length.should.equal(2);
  });

  it('should load local plugins', function () {
    var actual = plugins('./test/fixtures/*.js');
    Object.keys(actual).length.should.equal(3);
  });

  it('should load local plugins', function () {
    var actual = plugins('./gulpfile.js');
    Object.keys(actual).length.should.equal(1);
  });
});