# gulp-rollup-mep
> Make separate bundles with Rollup according to multiple entry points.

Current status is in development, therefore something functional of Rollup may not working. If you have any troubles with it - please open issues. Also,  I pleasure get help in development this package.  

## Usage
install `gulp-rollup-mep` as a development dependency:

```shell
npm install gulp-rollup-mep --save-dev
```
Then, add it to your `gulpfile.js`:

### Simple usage example
```javascript
var rollup = require('gulp-rollup-mep'),
    gulp = require('gulp');

gulp.task('rollup', function() {
  return gulp.src(['src/index.js', 'src/bundle1.js'])
  .pipe(rollup({
    format: "iife"
  }))
  .pipe(gulp.dest('build'));
});
```

### With Source Maps
```javascript
var rollup = require('gulp-rollup-mep'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('rollup', function() {
  return gulp.src(['src/index.js', 'src/bundle1.js'])
  .pipe(sourcemaps.init())
  .pipe(rollup({
    format: "iife",
    sourceMap: true
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'));
});
```

### With cache
```javascript
var rollup = require('gulp-rollup-mep'),
    gulp = require('gulp'),
    cache = {};
    
gulp.task('rollup', function() {
  return gulp.src(['src/index.js', 'src/bundle1.js'])
  .pipe(rollup({
    format: "iife"
  }), cache, function(bundle, filePath) {
    cache[filePath] = bundle;
  })
  .pipe(gulp.dest('build'));
});
```
### Additional options
`rollup`: accept you desired version of rollup.js
