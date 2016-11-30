var gulp = require('gulp');
var gutil = require("gulp-util");
var concat = require('gulp-concat');
var webpack = require("webpack");
var del = require('del');
var paths = require('./config/paths')

var filename = 'nashorn-polyfill.js'
var srcFiles = ['./lib/global-polyfill.js', './lib/timer-polyfill.js', './build/nashorn-polyfill.webpack.js']

gulp.task('clean', function () {
  return del(paths.build());
});

gulp.task('scripts', ['clean'], function () {
  var webpackConfig = require('./config/webpack.config.dev')
  return webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));

    gulp.src(srcFiles)
      .pipe(concat(filename))
      .pipe(gulp.dest('build/'));
  });
});

gulp.task('scripts:prod', ['clean'], function () {
  var webpackConfig = require('./config/webpack.config.prod')
  return webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));

    gulp.src(srcFiles)
      .pipe(concat(filename))
      .pipe(gulp.dest('build/'));
  });
});

