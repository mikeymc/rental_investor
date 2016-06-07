var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('shelljs');


var scripts = [
  './app/assets/stylesheets/**/*.css.scss',
  './styleguide/styleguide_assets/*.html'
];

var sassOptions = {
  includePaths: ['vendor/assets/bower_components/bootstrap-sass/assets/stylesheets/'],
  outputStyle: 'expanded',
  errLogToConsole: true
};

gulp.task('default', ['watch']);

gulp.task('watch', ['sass:compile', 'hologram'], function() {
  gulp.watch(scripts, ['sass:compile', 'hologram']);
});

gulp.task('sass:compile', function(callback) {
  gulp.src(scripts)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./public/styleguide/css'));
  callback();
});

gulp.task('hologram', ['sass:compile'], function() {
  shell.exec('hologram');
});