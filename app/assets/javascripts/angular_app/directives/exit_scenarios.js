angular.module('rentals').directive('exitScenarios', function(property_service, key_rent_ratios_service, exit_scenarios_service, cash_flow_service, irr_service) {
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

        $scope.one_year_irr = calculate_one_year_irr($scope.rental_property);
        $scope.three_year_irr = calculate_three_year_irr($scope.rental_property);
        $scope.five_year_irr = calculate_five_year_irr($scope.rental_property);

      }, true);

      /* --- Private --- */

      function calculate_one_year_irr(property) {
        var first_month = -1 * property_service.down_payment(property);
        var first_year_exit_net = cash_flow_service.one_year_exit_net(property);

        return irr_service.calculate_irr([first_month, first_year_exit_net]);
      }

      function calculate_three_year_irr(property) {
        var first_month = -1 * property_service.down_payment(property);
        var gain_on_sale = exit_scenarios_service.third_year_gain_on_sale(property);
        var three_year_nets = cash_flow_service.three_year_exit_nets(property, gain_on_sale);
        three_year_nets.unshift(first_month);

        return irr_service.calculate_irr(three_year_nets);
      }

      function calculate_five_year_irr(property) {
        var first_month = -1 * property_service.down_payment(property);
        var gain_on_sale = exit_scenarios_service.fifth_year_gain_on_sale(property);
        var five_year_nets = cash_flow_service.five_year_exit_nets(property, gain_on_sale);
        five_year_nets.unshift(first_month);

        return irr_service.calculate_irr(five_year_nets);
      }
    }
  }
});
