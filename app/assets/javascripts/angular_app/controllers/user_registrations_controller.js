angular.module('rentals').controller('UserRegistrationsController', function($auth, $scope) {
  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.registrationForm).then(function() {
      $auth.submitLogin({
        email: $scope.registrationForm.email,
        password: $scope.registrationForm.password
      });
    });
  };
});
