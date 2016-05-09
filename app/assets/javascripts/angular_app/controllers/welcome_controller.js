angular.module('rentals').controller('WelcomeController', function($scope, $state) {
  $scope.sign_in = function() {
    $state.go('sign_in');
  };

  $scope.sign_up = function() {
    $state.go('sign_up');
  };
});
