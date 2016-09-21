/*!
 * load-plugins <https://github.com/jonschlinkert/load-plugins>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha node-foo node-bar node-baz gulp-mocha */
require('should');
var plugins = require('..');
var resolve = require('resolve-dep');

describe('plugins', function () {
  it('should load plugins from node_modules', function () {
    plugins('gulp-*').should.have.properties(['mocha']);
  });

  it('should load plugins from node_modules', function () {
    plugins('node-*').should.have.properties(['nodeBar', 'nodeBaz', 'nodeFoo']);
  });

  it('should load plugins from node_modules', function () {
    plugins('node-{bar,baz}').should.have.properties(['nodeBar', 'nodeBaz']);
    plugins('node-{bar,baz}').should.not.have.properties(['nodeFoo']);
  });

  it('should load local plugins', function () {
    plugins('./test/fixtures/**/*.js').should.have.properties(['a', 'b', 'c']);
  });

  it('should allow a custom `name` function to be passed', function () {
    plugins('./test/fixtures/**/*.js', {
      rename: function (filepath) {
        return filepath;
      }
    }).should.have.properties(['a', 'b', 'c']);
  });

  it('Should correctly rename plugin when cwd is not at project root.', function () {
    var originalCwd = process.cwd();

    process.chdir(__dirname);
    plugins('gulp-*').should.have.properties(['mocha']);
    process.chdir(originalCwd);
  });
});
