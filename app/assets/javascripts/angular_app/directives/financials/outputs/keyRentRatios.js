angular.module('rentals').directive('keyRentRatios', function(property_service, key_rent_ratios_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/keyRentRatios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        $scope.avg_sq_ft_per_unit = property_service.getAverageAreaPerUnit($scope.rental_property);
        $scope.avg_rent_per_sq_ft = property_service.getAverageRentPerSquareFoot($scope.rental_property);
        $scope.total_cost_per_sq_ft = property_service.getTotalCostPerSquareFoot($scope.rental_property);
        $scope.cost_per_unit = property_service.getCostPerUnit($scope.rental_property);
        $scope.cap_rate = key_rent_ratios_service.get_cap_rate($scope.rental_property);
        $scope.gross_rent_multiplier = key_rent_ratios_service.get_gross_rent_multiplier($scope.rental_property);
        $scope.operating_efficiency = key_rent_ratios_service.get_operating_efficiency($scope.rental_property);
        $scope.expenses_per_unit = key_rent_ratios_service.get_expenses_per_unit($scope.rental_property);

      }, true);
    }
  }
});
