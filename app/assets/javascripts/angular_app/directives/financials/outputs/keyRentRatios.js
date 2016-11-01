angular.module('rentals').directive('keyRentRatios', function(propertyService, keyRentRatiosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/keyRentRatios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if(!$scope.rentalProperty) {
          return;
        }
        $scope.averageSquareFootagePerUnit = propertyService.getAverageAreaPerUnit($scope.rentalProperty);
        $scope.averageRentPerSquareFoot = propertyService.getAverageRentPerSquareFoot($scope.rentalProperty);
        $scope.totalCostPerSquareFoot = propertyService.getTotalCostPerSquareFoot($scope.rentalProperty);
        $scope.costPerUnit = propertyService.getCostPerUnit($scope.rentalProperty);
        $scope.capitalizationRate = keyRentRatiosService.getCapitalizationRate($scope.rentalProperty);
        $scope.grossRentMultiplier = keyRentRatiosService.getGrossRentMultiplier($scope.rentalProperty);
        $scope.operatingEfficiency = keyRentRatiosService.getOperatingEfficiency($scope.rentalProperty);
        $scope.expensesPerUnit = keyRentRatiosService.getExpensesPerUnit($scope.rentalProperty);

      }, true);
    }
  }
});
