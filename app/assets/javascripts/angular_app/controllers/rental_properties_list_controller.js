angular.module('rentals').controller('RentalPropertiesListController', function($scope, $http) {
  $scope.adding_new_property = false;

  $http.get('/api/rental_properties').then(function(response) {
    $scope.rental_properties = response.data;
  });

  $scope.show_add_property_row = function() {
    $scope.new_property = {};
    $scope.show_new_property_row = true;
  };

  $scope.save_new_property = function() {
    $http.post('/api/rental_properties', $scope.new_property).then(function(response) {
      $scope.rental_properties = response.data;
      $scope.show_new_property_row = false;
    });
  };

  $scope.cancel = function() {
    $scope.show_new_property_row = false;
  };
});
