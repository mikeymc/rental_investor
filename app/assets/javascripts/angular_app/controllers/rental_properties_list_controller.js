angular.module('rentals').controller('RentalPropertiesListController', function($scope, $http, $state, property_repository) {
  $scope.adding_new_property = false;

  property_repository.all().then(function(response) {
    $scope.rental_properties = response.data;
  });

  $scope.show_add_property_row = function() {
    $scope.new_property = {};
    $scope.show_new_property_row = true;
  };

  $scope.sign_out = function() {
    $state.go('sign_in');
  };

  $scope.save_new_property = function() {
    property_repository.create($scope.new_property).then(function(response) {
      $scope.rental_properties = response.data;
      $scope.show_new_property_row = false;
    });
  };

  $scope.cancel = function() {
    $scope.show_new_property_row = false;
  };

  $scope.remove = function(property_id) {
    property_repository.remove(property_id).then(function(response) {
      $scope.rental_properties = response.data;
    });
  }
});
