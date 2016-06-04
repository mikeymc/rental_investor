angular.module('rentals').controller('UserSessionsController', function($scope, $state) {
  $scope.error_message = '';

  $scope.login = function(login_form) {
    $scope.submitLogin(login_form).then(function() {
      $state.go('rental_properties');
    });
  };

  $scope.$on('auth:login-error', function() {
    $scope.error_message = 'Invalid login credentials. Please try again.';
  });

  $scope.sign_up = function() {
    $state.go('sign_up');
  }
});
