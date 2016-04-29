angular.module('rentals').directive('exitScenarios', function(property_service, key_rent_ratios_service, noi_service, operating_expenses_service) {
  return {
    templateUrl: 'investment_properties_pages/exit_scenarios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.first_year_exit_price = first_year_exit_price($scope.rental_property);
        $scope.third_year_exit_price = third_year_exit_price($scope.rental_property);
        $scope.third_year_gain_on_sale = third_year_gain_on_sale($scope.rental_property);
        $scope.first_year_gain_on_sale = first_year_gain_on_sale($scope.rental_property);
        $scope.cap_rate = key_rent_ratios_service.get_cap_rate($scope.rental_property);

        /* --- Private --- */

        function first_year_exit_price(property) {
          var cap_rate = key_rent_ratios_service.get_cap_rate(property);
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var noi = noi_service.net_annual_incomes(property, expenses)[0];

          return noi / (0.01 * cap_rate);
        }

        function third_year_exit_price(property) {
          var cap_rate = key_rent_ratios_service.get_cap_rate(property);
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var noi = noi_service.net_annual_incomes(property, expenses)[2];

          return noi / (0.01 * cap_rate);
        }

        function first_year_gain_on_sale(property) {
          var price = first_year_exit_price(property);
          var cost = property_service.get_total_cost(property);

          return price - cost;
        }

        function third_year_gain_on_sale(property) {
          var price = third_year_exit_price(property);
          var cost = property_service.get_total_cost(property);

          return price - cost;
        }
      });
    }
  }
});
