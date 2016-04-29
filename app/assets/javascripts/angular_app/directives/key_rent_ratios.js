angular.module('rentals').directive('keyRentRatios', function(property_service, noi_service, operating_expenses_service) {
  return {
    templateUrl: 'investment_properties_pages/key_rent_ratios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        var service = property_service;
        $scope.avg_sq_ft_per_unit = service.get_avg_area_per_unit($scope.rental_property);
        $scope.avg_rent_per_sq_ft = service.get_avg_rent_per_sq_ft($scope.rental_property);
        $scope.total_cost_per_sq_ft = service.get_total_cost_per_sq_ft($scope.rental_property);
        $scope.cost_per_unit = service.get_cost_per_unit($scope.rental_property);
        $scope.cap_rate = get_cap_rate($scope.rental_property);
        $scope.gross_rent_multiplier = get_gross_rent_multiplier($scope.rental_property);

        /* --- Private --- */

        function get_cap_rate(property) {
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var noi = noi_service.net_annual_incomes(property, expenses)[0];
          var cost = property_service.get_total_cost(property);

          return 100 * noi / cost;
        }

        function get_gross_rent_multiplier(property) {
          var first_year_rents = property_service.get_projected_gross_annual_rents(property)[0];
          var cost = property_service.get_total_cost(property);

          return cost / first_year_rents;
        }
      }, true);
    }
  }
});
