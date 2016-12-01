var gulp = require('gulp');
var gutil = require("gulp-util");
var concat = require('gulp-concat');
var webpack = require("webpack");
var del = require('del');
var paths = require('./config/paths')

var filename = 'nashorn-polyfill.js'
var srcFiles = ['./lib/global-polyfill.js', './lib/timer-polyfill.js', './build/nashorn-polyfill.webpack.js']

gulp.task('clean:build', function () {
  return del(paths.build());
});

gulp.task('clean:dist', function () {
  return del(paths.dist());
});

function webpackCompile (webpackConfig, callback) {
  return webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));

    gulp.src(srcFiles)
      .pipe(concat(filename))
      .pipe(gulp.dest('build/'));
    callback();
  });
}

gulp.task('scripts', ['clean:build'], function (callback) {
  var webpackConfig = require('./config/webpack.config.dev');
  return webpackCompile(webpackConfig, callback)
});

gulp.task('scripts:prod', ['clean:build'], function (callback) {
  var webpackConfig = require('./config/webpack.config.prod');
  return webpackCompile(webpackConfig, callback)
});

function copyJsToDist () {
  gulp.src('build/' + filename)
    .pipe(gulp.dest('dist/'));
}

gulp.task('scripts:dist', ['clean:dist', 'scripts:prod'], function () {
  setTimeout(copyJsToDist, 1000);
});

