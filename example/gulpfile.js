var rollup = require('../');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('rollup', function(){
  return gulp.src(['src/index.js', 'src/bundle1.js'])
  .pipe(sourcemaps.init())
  .pipe(rollup({
    format: "iife",
    sourceMap: true
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'));
});