'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');


const scripts = ['index.js', 'gulpfile.js', 'lib/*.js', 'test/*_test.js', 'models/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src('test/**/*_test.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint', 'test']);
});

gulp.task('webpack:dev', ['html:dev', 'css:dev'], () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        devtool: 'source-map',
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('html:dev', () => {
  gulp.src('app/index.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['webpack:dev']);
gulp.task('default', ['lint', 'test']);
