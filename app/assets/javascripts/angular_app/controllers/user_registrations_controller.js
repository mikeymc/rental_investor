angular.module('rentals').controller('UserRegistrationsController', function($auth, $scope, property_repository, $state) {
  $scope.handleRegBtnClick = function() {
    register()
      .then(login)
      .then(create_sample_property)
      .then(go_to_properties_list);
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

  function create_sample_property() {
    var sample_property = {
      street: '123 Sample St',
      city: 'Atlanta',
      state: 'GA',
      zip_code: '12345'
    };

    return property_repository.create(sample_property);
  }

  function go_to_properties_list() {
    $state.go('rental_properties');
  }
});
