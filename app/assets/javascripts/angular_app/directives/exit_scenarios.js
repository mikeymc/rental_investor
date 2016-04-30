angular.module('rentals').directive('exitScenarios', function(property_service, key_rent_ratios_service, exit_scenarios_service) {
  return {
    templateUrl: 'investment_properties_pages/exit_scenarios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.first_year_exit_price = exit_scenarios_service.first_year_exit_price($scope.rental_property);
        $scope.third_year_exit_price = exit_scenarios_service.third_year_exit_price($scope.rental_property);
        $scope.fifth_year_exit_price = exit_scenarios_service.fifth_year_exit_price($scope.rental_property);
        $scope.first_year_gain_on_sale = exit_scenarios_service.first_year_gain_on_sale($scope.rental_property);
        $scope.third_year_gain_on_sale = exit_scenarios_service.third_year_gain_on_sale($scope.rental_property);
        $scope.fifth_year_gain_on_sale = exit_scenarios_service.fifth_year_gain_on_sale($scope.rental_property);
        $scope.cap_rate = key_rent_ratios_service.get_cap_rate($scope.rental_property);

      });
    }
  }
});
