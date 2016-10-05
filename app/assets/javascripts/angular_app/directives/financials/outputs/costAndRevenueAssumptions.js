angular.module('rentals').directive('costAndRevenueAssumptions', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/costAndRevenueAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      var s = propertyService;
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        if ($scope.rental_property.closing_cost && $scope.rental_property.financing_and_income_assumption) {
          $scope.total_closing_costs = s.getClosingCosts($scope.rental_property);
          $scope.gross_monthly_rent = s.getGrossMonthlyRent($scope.rental_property);
          $scope.total_cost = s.getTotalCost($scope.rental_property);
          $scope.total_gross_monthly_income = s.getTotalGrossMonthlyIncome($scope.rental_property);
        }
      }, true);
    }
  }
});
