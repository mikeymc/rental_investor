angular.module('rentals').directive('keyRentRatios', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/key_rent_ratios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        var assumptions = $scope.rental_property.financing_and_income_assumption;
        $scope.avg_sq_ft_per_unit = assumptions.total_square_feet / assumptions.number_of_units;
        var gross_rent = cost_and_revenue_assumptions_service.get_gross_monthly_rent(assumptions);
        $scope.avg_rent_per_sq_ft = gross_rent / assumptions.total_square_feet;
      }, true);
    }
  }
});
