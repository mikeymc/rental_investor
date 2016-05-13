angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams, $timeout, $state, property_repository) {
  $scope.persistence_state = 'Save';

  property_repository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });

  $scope.save = function() {
    property_repository.update($stateParams.rental_id, $scope.rental_property).then(function(response) {
      $scope.rental_property = response.data;
      displaySavedFlag();
    });
  };

  /* --- Private ---*/

  function displaySavedFlag() {
    toggleSaved(true);
    $timeout(function() {
      toggleSaved(false);
    }, 3000);
  }

  function toggleSaved(flag) {
    if (flag) {
      $scope.persistence_state = 'Saved!';
    } else {
      $scope.persistence_state = 'Save';
    }
    $timeout(function() {
      $scope.$apply();
    }, 0);
  }
});
