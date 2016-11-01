angular.module('rentals').controller('rentalPropertiesListController', function($scope, $state, propertyRepository) {
  propertyRepository.all().then(function(response) {
    $scope.rentalProperties = response.data.rentalProperties;
  });

  $scope.saveNewProperty = function(property) {
    propertyRepository.create(property).then(function(response) {
      $scope.rentalProperties = response.data.rentalProperties;
    });
  };

  $scope.remove = function(property_id) {
    propertyRepository.remove(property_id).then(function(response) {
      $scope.rentalProperties = response.data.rentalProperties;
    });
  }
});
