angular.module('rentals').directive('keyRentRatios', function(cost_and_revenue_assumptions_service, $filter) {
  return {
    templateUrl: 'investment_properties_pages/key_rent_ratios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        $scope.avg_sq_ft_per_unit = avg_sq_ft_per_unit($scope.rental_property);
        $scope.avg_rent_per_sq_ft = avg_rent_per_sq_ft($scope.rental_property);
        $scope.total_cost_per_sq_ft = total_cost_per_sq_ft($scope.rental_property);
        $scope.cost_per_unit = cost_per_unit($scope.rental_property);
      }, true);

      /* --- Private --- */

      function cost_per_unit(property) {
        var assumptions = property.financing_and_income_assumption;
        var closing_costs = cost_and_revenue_assumptions_service.get_closing_costs(property);
        var total_cost = cost_and_revenue_assumptions_service.get_total_cost(closing_costs, assumptions);
        return total_cost / property.financing_and_income_assumption.number_of_units;
      }

      function avg_sq_ft_per_unit(property) {
        var assumptions = property.financing_and_income_assumption;
        return assumptions.total_square_feet / assumptions.number_of_units;
      }

      function total_cost_per_sq_ft(property) {
        var assumptions = property.financing_and_income_assumption;
        var closing_costs = cost_and_revenue_assumptions_service.get_closing_costs(property);
        var total_cost = cost_and_revenue_assumptions_service.get_total_cost(closing_costs, assumptions);
        return total_cost / assumptions.total_square_feet;
      }

      function avg_rent_per_sq_ft(property) {
        var assumptions = property.financing_and_income_assumption;
        var gross_rent = cost_and_revenue_assumptions_service.get_gross_monthly_rent(assumptions);
        return gross_rent / assumptions.total_square_feet;
      }
    }
  }
});
