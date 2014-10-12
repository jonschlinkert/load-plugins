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
    var res = plugins('gulp-*');
    Object.keys(res).length.should.equal(1);
    res.should.have.property('gulp-mocha');
  });

  it('should load plugins from node_modules', function () {
     Object.keys(plugins('node-*')).length.should.equal(3);
  });

  it('should load local plugins', function () {
     Object.keys(plugins('./test/fixtures/**/*.js')).length.should.equal(3);
  });

  it('should allow a custom `name` function to be passed', function () {
     Object.keys(plugins('./test/fixtures/**/*.js', {
      rename: function (filepath) {
        return filepath;
      }
     })).length.should.equal(3);
  });

  it('should load local plugins', function () {
     Object.keys(plugins('./gulpfile.js')).length.should.equal(1);
  });
});