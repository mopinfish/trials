var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;

gulp.task('browserify', function () {
    browserify('./sources/javascripts/app/main.es6', { debug: true })
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('./public/javascripts/bundle.js'))
      .pipe(gulp.dest('./'));
});
