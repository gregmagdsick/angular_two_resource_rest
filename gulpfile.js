'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const KarmaServer = require('karma').Server;

const scripts = ['index.js', 'gulpfile.js', 'lib/*.js', 'test/*_test.js', 'models/*.js'];

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

gulp.task('webpack:unitTest', () => {
  gulp.src('test/unit/test_entry.js')
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
    .pipe(gulp.dest('./test'));
});

gulp.task('karmaTest', (done) => {
  new KarmaServer({
    configfile: __dirname + './karma.conf.js'
  }, done).start();
});

gulp.task('html:dev', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('unitTest', ['webpack:unitTest', 'karmaTest']);
gulp.task('build', ['webpack:dev']);
gulp.task('test', ['lint', 'server:test']);
