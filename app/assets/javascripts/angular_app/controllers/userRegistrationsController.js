angular.module('rentals').controller('UserRegistrationsController', function($auth, $scope, propertyRepository, $state) {
  $scope.handleRegBtnClick = function() {
    register()
      .then(login)
      .then(createSampleProperty)
      .then(goToPropertiesList);
  };

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    $scope.error_message = reason.errors.full_messages[0];
  });

  /* --- Private --- */

  function register() {
    return $auth.submitRegistration($scope.registrationForm);
  }

  function login() {
    return $auth.submitLogin({
      email: $scope.registrationForm.email,
      password: $scope.registrationForm.password
    });
  }

  function createSampleProperty() {
    var sampleProperty = {
      street: '123 Sample St',
      city: 'Atlanta',
      state: 'GA',
      zip_code: '12345'
    };

    return propertyRepository.create(sampleProperty);
  }

  function goToPropertiesList() {
    $state.go('rental-properties');
  }
});
