const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
// const concat = require('gulp-concat')
// const babel = require('gulp-babel')
const watch = require('gulp-watch')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const webpack = require('webpack')
var exec = require('child_process').exec;



gulp.task('styles',
  gulp.series(()=> {
    return
    gulp.src('assets/sass/**/*.scss')
      .pipe(
        sass({
          outputStyle: 'compressed'
        })
        .on('error', sass.logError)
      )
      .pipe(autoprefixer({
          browsers: ['last 2 versions']
        })
      )
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())
  })
);


gulp.task('webpack',
  gulp.series((cb) => {
    return exec('npm run dev:webpack', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
  })
)


// Browser-sync to get live reload and sync with mobile devices
gulp.task(
	'browser-sync',
	gulp.series(function() {
		browserSync.init({
			server: './public',
			notify: false,
			open: true, //change this to true if you want the broser to open automatically
			injectChanges: false
		});
	})
);


// This is your Default Gulp task
gulp.task(
	'default',
	gulp.parallel([
		gulp.series([
			'webpack',
			'styles',
			function runningWatch() {
        gulp.watch('./assets/js/**/*', gulp.parallel('webpack'));
				gulp.watch('./assets/sass/**/*', gulp.parallel('styles'));
				gulp.watch(['./public/**/*', './public/*']).on('change', reload);
			}
		]),
		gulp.series(['browser-sync'])
	])
);

// gulp.task('webpack', shell.task([
//   'webpack'
// ]))

// gulp.task('server', shell.task([
//   'yarn run server'
// ]))

// gulp.task('browser-sync',
//   gulp.series(function() {
    // THIS IS FOR SITUATIONS WHEN YOU HAVE ANOTHER SERVER RUNNING
    // browserSync.init({
    //   proxy: {
    //     target: 'localhost:3000', // can be [virtual host, sub-directory, localhost with port]
    //     ws: true // enables websockets
    //   },
    //   serveStatic: ['.', './public']
    // })
//   })
// )
