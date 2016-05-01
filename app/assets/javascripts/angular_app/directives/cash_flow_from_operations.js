angular.module('rentals').directive('cashFlowFromOperations', function(property_service, operating_expenses_service, cash_flow_service, noi_service) {
  return {
    templateUrl: 'investment_properties_pages/cash_flow_from_operations.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var expenses = operating_expenses_service.all_operating_expenses($scope.rental_property);

        $scope.monthly_debt_service = property_service.monthly_loan_payment($scope.rental_property);
        $scope.annual_debt_service = cash_flow_service.annual_debt_service($scope.rental_property);
        $scope.cash_available = property_service.get_net_operating_income($scope.rental_property, expenses);
        $scope.annual_cash_available = property_service.get_net_annual_operating_incomes($scope.rental_property, expenses);
        $scope.monthly_cf_remaining = cash_flow_service.monthly_cash_flow_remaining($scope.rental_property);
        $scope.annual_cfs_remaining = cash_flow_service.annual_cash_flows_remaining($scope.rental_property);
        $scope.monthly_principal_reduction = cash_flow_service.monthly_cum_princ($scope.rental_property);
        $scope.yearly_principal_reductions = cash_flow_service.yearly_cum_princ($scope.rental_property);
        $scope.monthly_total_return = cash_flow_service.get_monthly_total_return($scope.rental_property);
        $scope.annual_total_returns = cash_flow_service.get_annual_total_returns($scope.rental_property);
        $scope.monthly_cf_debt_servicing_ratio = monthly_cf_debt_servicing_ratio($scope.rental_property);
        $scope.annual_cf_debt_servicing_ratio = annual_cf_debt_servicing_ratio($scope.rental_property);
        $scope.monthly_net_income_after_taxes = noi_service.monthly_net_income_after_taxes($scope.rental_property, expenses);
        $scope.annual_net_income_after_taxes = noi_service.annual_net_income_after_taxes($scope.rental_property, expenses);
        $scope.monthly_building_depreciation = noi_service.get_monthly_building_depreciation($scope.rental_property);
        $scope.annual_building_depreciation = noi_service.get_annual_building_depreciation($scope.rental_property);

        /* --- Private --- */

        function annual_cf_debt_servicing_ratio(property) {
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var annual_cash_available = property_service.get_net_annual_operating_incomes(property, expenses);
          var annual_debt_service = cash_flow_service.annual_debt_service(property);

          return _.map(annual_cash_available, function(cash) {
            return 100 * cash / annual_debt_service;
          });
        }

        function monthly_cf_debt_servicing_ratio(property) {
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var monthly_debt_service = property_service.monthly_loan_payment(property);
          var cash_available = property_service.get_net_operating_income(property, expenses);

          return 100 * cash_available / monthly_debt_service;
        }
      }, true);
    }
  }
});
