angular.module('rentals').controller('RentalPropertiesListController', function($scope, $http, $state) {
  $http.get('/api/rental_properties').then(function(response) {
    $scope.rental_properties = response.data;
  });

  $scope.goToProperty = function(id) {
    $state.go('rental_property', {rental_id: id});
  };
});
