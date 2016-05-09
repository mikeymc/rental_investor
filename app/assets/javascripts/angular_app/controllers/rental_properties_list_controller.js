angular.module('rentals').controller('RentalPropertiesListController', function($scope, $http, $state) {
  $scope.adding_new_property = false;

  $http.get('/api/rental_properties').then(function(response) {
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
    $http.post('/api/rental_properties', $scope.new_property).then(function(response) {
      $scope.rental_properties = response.data;
      $scope.show_new_property_row = false;
    });
  };

  $scope.cancel = function() {
    $scope.show_new_property_row = false;
  };

  $scope.remove = function(id) {
    $http.delete('/api/rental_properties/' + id).then(function(response) {
      $scope.rental_properties = response.data;
    });
  }
});
