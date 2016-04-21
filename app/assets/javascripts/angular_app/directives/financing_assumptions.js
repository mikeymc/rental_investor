angular.module('rentals').directive('financingAssumptions', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/financing_assumptions.html',
    restrict: 'E',
    link: function($scope) {
      var s = cost_and_revenue_assumptions_service;
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.total_closing_costs = s.get_closing_costs($scope.rental_property.closing_cost);
        $scope.total_cost = s.get_total_cost(
          $scope.total_closing_costs,
          $scope.rental_property.financing_and_income_assumption
        );

        $scope.equity_percentage = $scope.rental_property.financing_and_income_assumption.equity_percentage;
        $scope.down_payment = $scope.total_cost * $scope.equity_percentage / 100;

        $scope.balance_to_finance_percentage = 100 - $scope.equity_percentage;
        $scope.balance_to_finance = $scope.total_cost - $scope.down_payment;

      }, true);
    }
  }
});
