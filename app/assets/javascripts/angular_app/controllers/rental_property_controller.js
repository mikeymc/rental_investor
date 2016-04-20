angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams, $timeout) {
  $http.get('/api/rental_properties/' + $stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  });

  $scope.save = function() {
    $http.put('/api/rental_properties/' + $stateParams.rental_id, {rental_property: $scope.rental_property}).then(function(response) {
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
      $scope.persistenceState = 'Saved!';
    } else {
      $scope.persistenceState = '';
    }
    $timeout(function() {
      $scope.$apply();
    }, 0);
  }
});
