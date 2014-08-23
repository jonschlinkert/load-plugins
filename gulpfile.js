var gulp = require('gulp');
var plugins = require('./');
var plugin = plugins('gulp-*');


gulp.task('default', function () {
  gulp.src('test/test.js', {read: false})
    .pipe(plugin.mocha({reporter: 'spec'}));
});