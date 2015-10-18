var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var plumber= require('gulp-plumber');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config').browserify;

gulp.task('browserify', function () {
  browserify('./sources/javascripts/app/main.es6', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(plumber())
    .pipe(source('./public/javascripts/bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./'));

});
