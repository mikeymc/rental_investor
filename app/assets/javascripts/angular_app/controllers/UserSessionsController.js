angular.module('rentals').controller('UserSessionsController', function($scope) {
  $scope.error_message = '';

  $scope.$on('auth:login-error', function() {
    $scope.error_message = 'Invalid login credentials. Please try again.';
  });
});
