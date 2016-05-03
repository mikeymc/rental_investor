angular.module('rentals').controller('RentalPropertiesListController', function($scope, $http) {
  $http.get('/api/rental_properties').then(function(response) {
    $scope.rental_properties = response.data;
  });
});
