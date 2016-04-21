angular.module('rentals').directive('closingCostsInputs', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/closing_costs.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.rental_property.closing_cost.origination_fee = recalculate_origination_fee($scope.rental_property);
        $scope.total = closing_costs($scope.rental_property);

      }, true);

      /* --- Private --- */

      function recalculate_origination_fee(property) {
        var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
        var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);

        return 0.01 * (land_cost + building_cost);
      }

      function closing_costs(property) {
        return cost_and_revenue_assumptions_service.get_closing_costs(property.closing_cost);
      }
    }
  }
});
