// Karma configuration
// Generated on Sun Apr 17 2016 19:13:43 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'vendor/assets/bower_components/angular/angular.js',
      'vendor/assets/bower_components/jquery/dist/jquery.js',
      'vendor/assets/bower_components/underscore/underscore.js',
      'vendor/assets/bower_components/angular-mocks/angular-mocks.js',
      'vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
      'vendor/assets/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'app/assets/javascripts/angular_app/modules/**/*.js',
      'app/assets/javascripts/angular_app/controllers/**/*.js',
      'app/assets/javascripts/angular_app/directives/**/*.js',
      'app/assets/javascripts/angular_app/filters/**/*.js',
      'app/assets/javascripts/angular_app/services/**/*.js',
      'app/assets/javascripts/angular_app/spec/helpers/register_application.js',
      'app/assets/javascripts/angular_app/spec/helpers/scope.js',
      'app/assets/javascripts/angular_app/spec/helpers/inject_dependencies.js',
      'app/assets/javascripts/angular_app/spec/helpers/render_template.js',
      'app/assets/javascripts/angular_app/spec/**/*_spec.js'
    ],
    exclude: [],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};