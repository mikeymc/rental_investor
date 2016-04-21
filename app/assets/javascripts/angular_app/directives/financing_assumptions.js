angular.module('rentals').directive('financingAssumptions', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/financing_assumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var property = $scope.rental_property;
        $scope.equity_percentage = property.financing_and_income_assumption.equity_percentage;

        $scope.total_closing_costs = closing_costs(property);
        $scope.total_cost = total_cost(property);
        $scope.down_payment = down_payment($scope.total_cost, $scope.equity_percentage);
        $scope.balance_to_finance_percentage = percent_to_finance($scope.equity_percentage);
        $scope.balance_to_finance = balance_to_finance($scope.total_cost, $scope.down_payment);

      }, true);

      function closing_costs(property) {
        return cost_and_revenue_assumptions_service.get_closing_costs(property.closing_cost);
      }

      function total_cost(property) {
        var s = cost_and_revenue_assumptions_service;
        var closing_cost = s.get_closing_costs(property.closing_cost);
        return s.get_total_cost(closing_cost, property.financing_and_income_assumption);
      }

      function down_payment(total_cost, equity_percentage) {
        return total_cost * equity_percentage / 100;
      }

      function percent_to_finance(equity_percentage) {
        return 100 - equity_percentage;
      }

      function balance_to_finance(total_cost, down_payment) {
        return total_cost - down_payment;
      }
    }
  }
});
