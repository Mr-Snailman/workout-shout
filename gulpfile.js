var gulp = require('gulp'),
  del = require('del'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  htmlLoc = 'src/main/html/**/*.html',
  srcLoc = 'src/main/javascript/**/*.js',
  destLoc = 'src/main/webapp/js',
  destName = 'main.min.js';

gulp.task('clean', function() {
  return del(destLoc); 
});

// Not used currently; waiting to do templating...
gulp.task('build-html', function() {
  return gulp.src(htmlLoc)
    .pipe(gulp.dest(destLoc));
});

gulp.task('jshint', function() {
  return gulp.src(srcLoc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', ['jshint'], function() {
  return gulp.src(srcLoc)
    .pipe(concat('bundle.js'))
    .pipe(rename(destName))
    .pipe(uglify())
    .pipe(gulp.dest(destLoc));
});

gulp.task('build', ['build-js']);
gulp.task('default', ['build']);

