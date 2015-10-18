var gulp = require('gulp');
var babel = require('gulp-babel');
var config = require('../config').babel;

gulp.task('babel', function () {
    gulp.src(config.src)
        .pipe(babel())
        .pipe(gulp.dest(config.dest));
});

