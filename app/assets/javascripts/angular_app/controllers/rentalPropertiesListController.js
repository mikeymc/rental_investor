angular.module('rentals').controller('rentalPropertiesListController', function($scope, $state, propertyRepository) {
  $scope.adding_new_property = false;

  propertyRepository.all().then(function(response) {
    $scope.rental_properties = response.data;
  });

  $scope.show_add_property_row = function() {
    $scope.new_property = {};
    $scope.show_new_property_row = true;
  };

  $scope.sign_out = function() {
    $state.go('sign_in');
  };

  $scope.save_new_property = function(property) {
    propertyRepository.create(property).then(function(response) {
      $scope.rental_properties = response.data;
      $scope.show_new_property_row = false;
    });
  };

  $scope.cancel = function() {
    $scope.show_new_property_row = false;
  };

  $scope.remove = function(property_id) {
    propertyRepository.remove(property_id).then(function(response) {
      $scope.rental_properties = response.data;
    });
  }
});
