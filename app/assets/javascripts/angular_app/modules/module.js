angular.module('rentals', ['ui.router', 'ng-token-auth']).run(function($rootScope, $location) {
  $rootScope.$on('auth:logout-success', function() {
    $location.path('/sign_in');
  });
});
