angular.module('rentals').controller('userSessionsController', function($scope, $state) {
  $scope.login = function(loginForm) {
    $scope.submitLogin(loginForm).then(function() {
      $state.go('rental-properties');
    });
  };

  $scope.$on('auth:login-error', function() {
    $scope.errorMessage = 'Invalid login credentials. Please try again.';
  });

  $scope.signUp = function() {
    $state.go('sign-up');
  }
});
