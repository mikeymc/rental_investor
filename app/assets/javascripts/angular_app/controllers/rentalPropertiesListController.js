angular.module('rentals').controller('rentalPropertiesListController', function($scope, $state, propertyRepository) {
  propertyRepository.all().then(function(response) {
    $scope.rental_properties = response.data;
  });

  $scope.sign_out = function() {
    $state.go('sign_in');
  };

  $scope.save_new_property = function(property) {
    propertyRepository.create(property).then(function(response) {
      $scope.rental_properties = response.data;
    });
  };

  $scope.remove = function(property_id) {
    propertyRepository.remove(property_id).then(function(response) {
      $scope.rental_properties = response.data;
    });
  }
});
