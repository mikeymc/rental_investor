angular.module('rentals').directive('netCashFlows', function(property_service, cash_flow_service, exit_scenarios_service) {
  return {
    templateUrl: 'investment_properties_pages/net_cash_flows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.monthly_cash_flow = -1 * property_service.down_payment($scope.rental_property);
        $scope.one_year_exit_net = one_year_exit_net($scope.rental_property);
        $scope.three_year_exit_nets = three_year_exit_nets($scope.rental_property);
        $scope.five_year_exit_nets = five_year_exit_nets($scope.rental_property);

        /* --- Private --- */

        function one_year_exit_net(property) {
          var down_payment = property_service.down_payment(property);
          var total_return = cash_flow_service.get_annual_total_returns(property)[0];

          return down_payment + total_return;
        }


        function three_year_exit_nets(property) {
          function three_year_exit_gain(property) {
            var annual_principal_reductions = cash_flow_service.yearly_cum_princ(property);

            var values = [
              cash_flow_service.get_annual_total_returns(property)[2],
              annual_principal_reductions[0],
              annual_principal_reductions[1],
              property_service.down_payment(property),
              exit_scenarios_service.third_year_gain_on_sale(property)
            ];

            return _.reduce(values, function(memo, item) {
              return memo + parseFloat(item);
            }, 0);
          }

          var cfs = [];
          var annual_remaining_cash_flows = cash_flow_service.annual_cash_flows_remaining(property);
          cfs.push(annual_remaining_cash_flows[0]);
          cfs.push(annual_remaining_cash_flows[1]);
          cfs.push(three_year_exit_gain(property));

          return cfs;
        }

        function five_year_exit_nets(property) {
          function five_year_exit_gain(property) {
            var annual_principal_reductions = cash_flow_service.yearly_cum_princ(property);

            var values = [
              cash_flow_service.get_annual_total_returns(property)[4],
              annual_principal_reductions[0],
              annual_principal_reductions[1],
              annual_principal_reductions[2],
              annual_principal_reductions[3],
              property_service.down_payment(property),
              exit_scenarios_service.fifth_year_gain_on_sale(property)
            ];

            return _.reduce(values, function(memo, item) {
              return memo + parseFloat(item);
            }, 0);
          }

          var cfs = [];
          var annual_remaining_cash_flows = cash_flow_service.annual_cash_flows_remaining(property);
          cfs.push(annual_remaining_cash_flows[0]);
          cfs.push(annual_remaining_cash_flows[1]);
          cfs.push(annual_remaining_cash_flows[2]);
          cfs.push(annual_remaining_cash_flows[3]);
          cfs.push(five_year_exit_gain(property));

          return cfs;
        }
      });
    }
  }
});
