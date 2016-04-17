angular.module('rentals').controller('RentalPropertyController', function($scope, $http, $stateParams) {
  $http.get('/api/rental_properties/' + $stateParams.rental_id).then(function(response) {
    var rental_property = response.data;
    $scope.financing_and_income_assumption = rental_property.financing_and_income_assumption;
    $scope.operating_expenses_assumption = rental_property.operating_expenses_assumption;
    $scope.closing_cost = rental_property.closing_cost;
    $scope.income_and_cost_projection = rental_property.income_and_cost_projection;
  });
});
