angular.module('rentals').directive('closingCostsInputs', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/closing_costs.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }

        var land_cost = parseFloat($scope.rental_property.financing_and_income_assumption.land_cost);
        var building_cost = parseFloat($scope.rental_property.financing_and_income_assumption.building_cost);
        $scope.rental_property.closing_cost.origination_fee = 0.01 * (land_cost + building_cost);

        $scope.total = cost_and_revenue_assumptions_service.get_closing_costs(
          $scope.rental_property.closing_cost
        );

      }, true);
    }
  }
});
