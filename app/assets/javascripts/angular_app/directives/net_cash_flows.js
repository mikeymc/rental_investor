angular.module('rentals').directive('netCashFlows', function(property_service, cash_flow_service) {
  return {
    templateUrl: 'investment_properties_pages/net_cash_flows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.monthly_cash_flow = -1 * property_service.down_payment($scope.rental_property);
        $scope.one_year_exit_net = -1 * one_year_exit_net($scope.rental_property);

        /* --- Private --- */

        function one_year_exit_net(property) {
          var down_payment = property_service.down_payment(property);
          var total_return = cash_flow_service.get_annual_total_returns(property)[0];

          return down_payment + total_return;
        }
      });
    }
  }
});
