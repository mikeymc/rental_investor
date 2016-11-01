angular.module('rentals').directive('costAndRevenueAssumptions', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/costAndRevenueAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if(!$scope.rentalProperty) {
          return;
        }
        if ($scope.rentalProperty.closingCost && $scope.rentalProperty.financingAndIncomeAssumption) {
          $scope.totalClosingCosts = propertyService.getClosingCosts($scope.rentalProperty);
          $scope.grossMonthlyRent = propertyService.getGrossMonthlyRent($scope.rentalProperty);
          $scope.totalCost = propertyService.getTotalCost($scope.rentalProperty);
          $scope.totalGrossMonthlyIncome = propertyService.getTotalGrossMonthlyIncome($scope.rentalProperty);
        }
      }, true);
    }
  }
});
