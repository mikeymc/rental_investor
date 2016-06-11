var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('shelljs');

var stuffToWatch = [
  './styleguide/styleguide_assets/*.html',
  './app/assets/stylesheets/**/*'
];

gulp.task('default', ['watch']);

gulp.task('watch', ['sass:compile', 'buildStyleGuide', 'importBootstrap'], function() {
  gulp.watch(stuffToWatch, ['sass:compile', 'buildStyleGuide']);
});

gulp.task('sass:compile', function(callback) {
  var loadPath = 'vendor/assets/bower_components/bootstrap-sass/assets/stylesheets/';
  var inputFile = 'app/assets/stylesheets/application.css.scss';
  var outputFile = './public/styleguide/css/application.css';

  shell.exec('mkdir -p public/styleguide/css');
  shell.exec('sass --load-path="' + loadPath + '" ' + inputFile + ' ' + outputFile);
  callback();
});

gulp.task('importBootstrap', function(callback) {
  var input = 'vendor/assets/bower_components/bootstrap-sass/assets/fonts/bootstrap/*';
  var output = './public/styleguide/css/bootstrap';

  gulp.src(input).pipe(gulp.dest(output));
  callback();
});

gulp.task('buildStyleGuide', ['sass:compile'], function() {
  shell.exec('hologram');
});
