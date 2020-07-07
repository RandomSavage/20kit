const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')

// const watch = require('gulp-watch')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const webpack = require('webpack')
var exec = require('child_process').exec;
const { src, dest, watch, series, parallel } = require('gulp');




console.log('hello');


function styles(cb) {
  return gulp
    .src('assets/sass/**/*.scss')
      .pipe(
        sass({outputStyle: 'compressed'})
        .on('error', sass.logError)
      )
      // .pipe(
      //   autoprefixer({browsers: ['last 2 versions']})
      // )
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())

  cb();
}

function webjack(cb) {
  return exec('npm run dev:webpack', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
  cb();
}

function browserSionic(cb) {
  browserSync.init({
    server: './public',
    notify: false,
    open: true, //change this to false if you don't want the browser to auto components
    injectChanges: false
  });
  cb();
}

function defJam(cb) {
  gulp.watch('./assets/js/**/*', gulp.parallel('webjack'));
  gulp.watch('./assets/sass/**/*', gulp.parallel('styles'));
  gulp.watch(['./public/**/*', './public/*']).on('change', reload);
  cb();
}

exports.default = parallel(series(styles, webjack), series(browserSionic)), series(defJam);
// exports.build = default(parallel(series(styles, webjack), series(browserSionic)), series(defJam));
// exports.build = series(clean, parallel(css, javascript));
