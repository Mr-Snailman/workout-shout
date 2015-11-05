var 
  gulp      = require('gulp'),
  del       = require('del'),
  jshint    = require('gulp-jshint'),
  uglify    = require('gulp-uglify'),
  rename    = require('gulp-rename'),
  htmlLoc   = 'src/main/html/**/*.html',
  resLoc    = 'src/main/resources/**/*',
  srcLoc    = 'src/main/javascript/**/*.js',
  destLoc   = 'dist',
  destName  = 'main.min.js';

gulp.task('clean', function() {
  return del(destLoc); 
});

gulp.task('copy-html', function() {
  return gulp.src(htmlLoc)
    .pipe(gulp.dest(destLoc));
});

gulp.task('copy-resources', function() {
  return gulp.src(resLoc)
    .pipe(gulp.dest(destLoc));
});

gulp.task('jshint', function() {
  return gulp.src(srcLoc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', ['jshint'], function() {
  return gulp.src(srcLoc)
    .pipe(rename(destName))
    .pipe(uglify())
    .pipe(gulp.dest(destLoc+'/js'));
});

gulp.task('get-resources', ['copy-html', 'copy-resources']);

gulp.task('build', ['build-js', 'get-resources']);
gulp.task('default', ['build']);

