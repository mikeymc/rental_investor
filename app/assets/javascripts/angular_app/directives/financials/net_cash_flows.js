angular.module('rentals').directive('netCashFlows', function(property_service, cash_flow_service, exit_scenarios_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/net_cash_flows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.monthly_cash_flow = -1 * property_service.down_payment($scope.rental_property);
        $scope.one_year_exit_net = cash_flow_service.one_year_exit_net($scope.rental_property);
        $scope.three_year_exit_nets = three_year_exit_nets($scope.rental_property);
        $scope.five_year_exit_nets = five_year_exit_nets($scope.rental_property);
      }, true);

      /* --- Private --- */

      function three_year_exit_nets(property) {
        var gain_on_sale = exit_scenarios_service.third_year_gain_on_sale(property);
        return cash_flow_service.three_year_exit_nets(property, gain_on_sale);
      }

      function five_year_exit_nets(property) {
        var gain_on_sale = exit_scenarios_service.fifth_year_gain_on_sale(property);
        return cash_flow_service.five_year_exit_nets(property, gain_on_sale);
      }
    }
  }
});
