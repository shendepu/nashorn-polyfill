var gulp = require('gulp');
var concat = require('gulp-concat');

var filename = 'nashorn-server-polyfill.js'

var srcFiles = ['./lib/global-polyfill.js', './lib/timer-polyfill.js']
gulp.task('scripts', function() {
  return gulp.src(srcFiles)
    .pipe(concat(filename))
    .pipe(gulp.dest('./build/'));
});


