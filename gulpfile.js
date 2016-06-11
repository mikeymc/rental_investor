var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('shelljs');


var scripts = [
  './styleguide/styleguide_assets/*.html',
  './app/assets/stylesheets/**/*'
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
  shell.exec('sass --load-path="vendor/assets/bower_components/bootstrap-sass/assets/stylesheets/" app/assets/stylesheets/application.css.scss ./public/styleguide/css/application.css');
  gulp.src(['./styleguide/styleguide_assets/*.html']).pipe(gulp.dest('./public/styleguide/css'));
  gulp.src('vendor/assets/bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
    .pipe(gulp.dest('./public/styleguide/css/bootstrap'));
  callback();
});

gulp.task('hologram', ['sass:compile'], function() {
  shell.exec('hologram');
});
