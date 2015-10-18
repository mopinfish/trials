var gulp = require('gulp');
var config = require('../config').watch;

gulp.task("watch", function () {
  Object.keys(config).forEach(function (path) {
    gulp.watch(path, config[path]);
  });
});
