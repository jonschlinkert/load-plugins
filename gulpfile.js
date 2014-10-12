var gulp = require('gulp');

/**
 * Example usage of load-plugins
 */

var plugins = require('./')('gulp-*');
var mocha = plugins['gulp-mocha'];


gulp.task('default', function () {
  gulp.src('test/test.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});