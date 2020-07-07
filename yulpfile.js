// const gulp = require('gulp')
// const sass = require('gulp-sass')
// const autoprefixer = require('gulp-autoprefixer')
// // const concat = require('gulp-concat')
// // const babel = require('gulp-babel')
// const watch = require('gulp-watch')
// const browserSync = require('browser-sync')
// const reload = browserSync.reload
// const webpack = require('webpack')
// var exec = require('child_process').exec;

const {series, parallel} = require('gulp');

function styles(cb) {
  return gulp
    .src('assets/sass/**/*.scss')
      .pipe(
        sass({outputStyle: 'compressed'})
        .on('error', sass.logError)
      )
      .pipe(
        autoprefixer({browsers: ['last 2 versions']})
      )
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())

  cb();
}

function webpack(cb) {
  return exec('npm run dev:webpack', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  cb();
}

function browserSync(cb) {
  browserSync.init({
    server: './public',
    notify: false,
    open: true, //change this to false if you don't want the browser to auto components
    injectChanges: false
  });
  cb();
}

function defJam(cb) {
  gulp.watch('./assets/js/**/*', gulp.parallel('webpack'));
  gulp.watch('./assets/sass/**/*', gulp.parallel('styles'));
  gulp.watch(['./public/**/*', './public/*']).on('change', reload);
  cb();
}

exports.build = parallel(series(styles, webpack), series(browserSync)), series(defJam);
// exports.build = series(clean, parallel(css, javascript));
