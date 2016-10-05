angular.module('rentals').directive('cashFlowFromOperations', function(propertyService, operating_expenses_service, cashFlowService, noi_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/cashFlowFromOperations.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var expenses = operating_expenses_service.all_operating_expenses($scope.rental_property);

        $scope.monthly_debt_service = propertyService.getMonthlyLoanPayment($scope.rental_property);
        $scope.annual_debt_service = cashFlowService.annual_debt_service($scope.rental_property);
        $scope.cash_available = propertyService.getNetOperatingIncome($scope.rental_property, expenses);
        $scope.annual_cash_available = propertyService.getNetAnnualOperatingIncomes($scope.rental_property, expenses);
        $scope.monthly_cf_remaining = cashFlowService.getMonthlyCashFlowRemaining($scope.rental_property);
        $scope.annual_cfs_remaining = cashFlowService.getAnnualCashFlowsRemaining($scope.rental_property);
        $scope.monthly_principal_reduction = cashFlowService.getMonthlyCumPrinc($scope.rental_property);
        $scope.yearly_principal_reductions = cashFlowService.getAnnualCumPrincs($scope.rental_property);
        $scope.monthly_total_return = cashFlowService.getMonthlyTotalReturn($scope.rental_property);
        $scope.annual_total_returns = cashFlowService.getAnnualTotalReturns($scope.rental_property);
        $scope.monthly_cf_debt_servicing_ratio = monthly_cf_debt_servicing_ratio($scope.rental_property);
        $scope.annual_cf_debt_servicing_ratio = annual_cf_debt_servicing_ratio($scope.rental_property);
        $scope.monthly_net_income_after_taxes = noi_service.monthly_net_income_after_taxes($scope.rental_property, expenses);
        $scope.annual_net_income_after_taxes = noi_service.annual_net_income_after_taxes($scope.rental_property, expenses);
        $scope.monthly_building_depreciation = noi_service.get_monthly_building_depreciation($scope.rental_property);
        $scope.annual_building_depreciation = noi_service.get_annual_building_depreciation($scope.rental_property);
        $scope.monthly_interest_on_loan = noi_service.monthly_interest_on_loan($scope.rental_property);
        $scope.annual_interest_on_loan = noi_service.get_annual_interest_on_loan($scope.rental_property);
        $scope.monthly_total_cf_from_operations = monthly_total_cf_from_operations($scope.rental_property, expenses);
        $scope.annual_total_cf_from_operations = annual_total_cf_from_operations($scope.rental_property, expenses);

        /* --- Private --- */

        function monthly_total_cf_from_operations(property, expenses) {
          var depreciation = noi_service.get_monthly_building_depreciation(property);
          var income_after_taxes = noi_service.monthly_net_income_after_taxes(property, expenses);

          return depreciation + income_after_taxes;
        }

        function annual_total_cf_from_operations(property, expenses) {
          var depreciation = noi_service.get_annual_building_depreciation(property);
          var income_after_taxes = noi_service.annual_net_income_after_taxes(property, expenses);

          return _.map(income_after_taxes, function(income) {
            return depreciation + income;
          });
        }

        function annual_cf_debt_servicing_ratio(property) {
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var annual_cash_available = propertyService.getNetAnnualOperatingIncomes(property, expenses);
          var annual_debt_service = cashFlowService.annual_debt_service(property);

          return _.map(annual_cash_available, function(cash) {
            return 100 * cash / annual_debt_service;
          });
        }

        function monthly_cf_debt_servicing_ratio(property) {
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var monthly_debt_service = propertyService.getMonthlyLoanPayment(property);
          var cash_available = propertyService.getNetOperatingIncome(property, expenses);

          return 100 * cash_available / monthly_debt_service;
        }
      }, true);
    }
  }
});
