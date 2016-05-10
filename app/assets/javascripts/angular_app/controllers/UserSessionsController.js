angular.module('rentals').controller('UserSessionsController', function($scope, $state) {
  $scope.error_message = '';

  $scope.$on('auth:login-error', function() {
    $scope.error_message = 'Invalid login credentials. Please try again.';
  });

  $scope.sign_up = function() {
    $state.go('sign_up');
  }
});
