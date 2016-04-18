angular.module('rentals').directive('costAndRevenueAssumptions', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/cost_and_revenue_assumptions.html',
    restrict: 'E',
    link: function($scope) {
      var s = cost_and_revenue_assumptions_service;
      $scope.$watchGroup(['closing_cost', 'financing_and_income_assumption'], function() {
        if ($scope.closing_cost && $scope.financing_and_income_assumption) {
          $scope.total_closing_costs = s.get_closing_costs($scope.closing_cost);
          $scope.gross_monthly_rent = s.get_gross_monthly_rent(
            $scope.financing_and_income_assumption
          );
          $scope.total_cost = s.get_total_cost(
            $scope.total_closing_costs,
            $scope.financing_and_income_assumption
          );
          $scope.total_gross_monthly_income = s.get_total_gross_monthly_income(
            $scope.gross_monthly_rent,
            $scope.financing_and_income_assumption
          );
        }
      });
    }
  }
});
