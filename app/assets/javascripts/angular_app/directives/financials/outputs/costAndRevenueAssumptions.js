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
          $scope.total_closing_costs = propertyService.getClosingCosts($scope.rental_property);
          $scope.gross_monthly_rent = propertyService.getGrossMonthlyRent($scope.rental_property);
          $scope.total_cost = propertyService.getTotalCost($scope.rental_property);
          $scope.total_gross_monthly_income = propertyService.getTotalGrossMonthlyIncome($scope.rental_property);
        }
      }, true);
    }
  }
});
