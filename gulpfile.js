'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('clean', function () {
  return del(['./dist/styles.css'])
});

gulp.task('sass', gulp.series('clean', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}));

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('serve', gulp.parallel('sass', function () {

  browserSync.init({
    server: "./"
  });

  gulp.watch('./scss/**/*.scss', gulp.series('sass'));

}));