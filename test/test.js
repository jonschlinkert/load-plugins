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
    plugins('gulp-*', {strip: 'gulp', lazy: false}).should.have.properties(['mocha', 'postcss']);
  });

  it('should lazy load plugins from node_modules', function () {
    var result = plugins('node-*');
    result.should.have.properties(['nodeBar', 'nodeBaz', 'nodeFoo']);
    result.should.be.eql({});
  });

  it('should load plugins from node_modules', function () {
    var result = plugins('node-{bar,baz}');
    result.should.have.properties(['nodeBar', 'nodeBaz']);
    result.should.not.have.properties(['nodeFoo']);
  });

  it('should load local plugins', function () {
    plugins('./test/fixtures/**/*.js').should.have.properties(['ab', 'bc', 'cd']);
  });

  it('should allow a custom `name` function to be passed', function () {
    var i = 0;
    plugins('gulp-*', {
      lazy: false,
      rename: function (filepath) {
        i += 1
        return i;
      }
    }).should.have.properties([1, 2]);
  });
});
