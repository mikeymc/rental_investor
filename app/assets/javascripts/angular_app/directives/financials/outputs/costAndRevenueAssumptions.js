angular.module('rentals').directive('costAndRevenueAssumptions', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/costAndRevenueAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        if ($scope.rental_property.closing_cost && $scope.rental_property.financing_and_income_assumption) {
          $scope.totalClosingCosts = propertyService.getClosingCosts($scope.rental_property);
          $scope.grossMonthlyRent = propertyService.getGrossMonthlyRent($scope.rental_property);
          $scope.totalCost = propertyService.getTotalCost($scope.rental_property);
          $scope.totalGrossMonthlyIncome = propertyService.getTotalGrossMonthlyIncome($scope.rental_property);
        }
      }, true);
    }
  }
});
