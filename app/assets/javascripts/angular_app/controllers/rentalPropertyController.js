angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams, $timeout, $state, propertyRepository) {
  $scope.rental_id = $stateParams.rental_id;

  propertyRepository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });
});
