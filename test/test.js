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

describe('plugins', function () {
  it('should load plugins from node_modules and strip names', function () {
    plugins('gulp-*', {strip: 'gulp'}).should.have.properties(['mocha', 'postcss']);
  });

  it('should load plugins from node_modules', function () {
    plugins('node-*').should.have.properties(['nodeBar', 'nodeBaz', 'nodeFoo']);
  });

  it('should load plugins from node_modules', function () {
    plugins('node-{bar,baz}').should.have.properties(['nodeBar', 'nodeBaz']);
    plugins('node-{bar,baz}').should.not.have.properties(['nodeFoo']);
  });

  it('should load local plugins', function () {
    plugins('./test/fixtures/**/*.js').should.have.properties(['ab', 'bc', 'cd']);
  });

  it('should allow a custom `name` function to be passed', function () {
    var i = 0;
    plugins('gulp-*', {
      rename: function (filepath) {
        i += 1
        return i;
      }
    }).should.have.properties([1, 2]);
  });
});
