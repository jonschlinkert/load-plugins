'use strict';

var gulp = require('gulp');
var plugin = require('./')('gulp-*');

gulp.task('default', function () {
  gulp.src('test/test.js')
    .pipe(plugin.mocha({
      reporter: 'spec'
    }));
});