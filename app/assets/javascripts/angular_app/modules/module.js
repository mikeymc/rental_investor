angular.module('rentals', ['ui.router', 'ng-token-auth']).run(function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/rental_properties');
  });

  $rootScope.$on('auth:logout-success', function() {
    $location.path('/sign_in');
  });
});
