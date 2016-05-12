angular.module('rentals').controller('UserRegistrationsController', function($auth, $scope) {
  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.registrationForm).then(function() {
      $auth.submitLogin({
        email: $scope.registrationForm.email,
        password: $scope.registrationForm.password
      });
    });
  };

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    $scope.error_message = reason.errors.full_messages[0];
  });
});
