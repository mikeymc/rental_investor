angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams, $timeout, $state, propertyRepository) {
  $scope.rentalId = $stateParams.rentalId;
  propertyRepository.find($stateParams.rentalId).then(function(response) {
    $scope.rentalProperty = response.data.rentalProperty;
  }, function() {
    $state.go('404');
  });
});
