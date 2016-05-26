'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const KarmaServer = require('karma').Server;
const sass = require('gulp-sass');

const scripts = ['index.js', 'gulpfile.js', 'lib/*.js',
'test/*-test.js', 'models/*.js', 'app/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('server:test', () => {
  return gulp.src('test/server_test.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  return gulp.watch(scripts, ['lint', 'test']);
});

gulp.task('webpack:dev', ['html:dev', 'scss:dev'], () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:unitTest', () => {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('./test/unit'));
});

gulp.task('karmaTest', (done) => {
  return new KarmaServer({
    configfile: __dirname + './karma.conf.js'
  }, done).start();
});

gulp.task('html:dev', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('scss:dev', () => {
  return gulp.src('app/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('client:test', ['webpack:unitTest']);
gulp.task('build', ['webpack:dev']);
gulp.task('test', ['lint', 'server:test', 'client:test']);
