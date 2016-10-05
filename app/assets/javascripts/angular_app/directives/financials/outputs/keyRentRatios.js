angular.module('rentals').directive('keyRentRatios', function(propertyService, keyRentRatiosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/keyRentRatios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        $scope.avg_sq_ft_per_unit = propertyService.getAverageAreaPerUnit($scope.rental_property);
        $scope.avg_rent_per_sq_ft = propertyService.getAverageRentPerSquareFoot($scope.rental_property);
        $scope.total_cost_per_sq_ft = propertyService.getTotalCostPerSquareFoot($scope.rental_property);
        $scope.cost_per_unit = propertyService.getCostPerUnit($scope.rental_property);
        $scope.cap_rate = keyRentRatiosService.getCapitalizationRate($scope.rental_property);
        $scope.gross_rent_multiplier = keyRentRatiosService.getGrossRentMultiplier($scope.rental_property);
        $scope.operating_efficiency = keyRentRatiosService.getOperatingEfficiency($scope.rental_property);
        $scope.expenses_per_unit = keyRentRatiosService.getExpensesPerUnit($scope.rental_property);

      }, true);
    }
  }
});
