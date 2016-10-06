angular.module('rentals').directive('keyRentRatios', function(propertyService, keyRentRatiosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/keyRentRatios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        $scope.averageSquareFootagePerUnit = propertyService.getAverageAreaPerUnit($scope.rental_property);
        $scope.averageRentPerSquareFoot = propertyService.getAverageRentPerSquareFoot($scope.rental_property);
        $scope.totalCostPerSquareFoot = propertyService.getTotalCostPerSquareFoot($scope.rental_property);
        $scope.costPerUnit = propertyService.getCostPerUnit($scope.rental_property);
        $scope.capitalizationRate = keyRentRatiosService.getCapitalizationRate($scope.rental_property);
        $scope.grossRentMultiplier = keyRentRatiosService.getGrossRentMultiplier($scope.rental_property);
        $scope.operatingEfficiency = keyRentRatiosService.getOperatingEfficiency($scope.rental_property);
        $scope.expensesPerUnit = keyRentRatiosService.getExpensesPerUnit($scope.rental_property);

      }, true);
    }
  }
});
