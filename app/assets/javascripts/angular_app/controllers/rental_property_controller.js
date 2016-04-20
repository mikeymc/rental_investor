angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams) {
  $http.get('/api/rental_properties/' + $stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  });
});
