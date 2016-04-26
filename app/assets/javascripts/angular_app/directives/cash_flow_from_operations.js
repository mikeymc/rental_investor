angular.module('rentals').directive('cashFlowFromOperations', function(property_service, operating_expenses_service) {
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
        $scope.annual_debt_service = annual_debt_service($scope.rental_property);
        $scope.cash_available = property_service.get_net_operating_income($scope.rental_property, expenses);
        $scope.annual_cash_available = property_service.get_net_annual_operating_incomes($scope.rental_property, expenses);
        $scope.monthly_cf_remaining = monthly_cash_flow_remaining($scope.rental_property);
        $scope.annual_cfs_remaining = annual_cash_flows_remaining($scope.rental_property);

        /* --- Private --- */

        function annual_debt_service(property) {
          return 12 * property_service.monthly_loan_payment(property);
        }

        function monthly_cash_flow_remaining(property) {
          var monthly_debt_service = property_service.monthly_loan_payment(property);
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var cash_available = property_service.get_net_operating_income(property, expenses);

          return cash_available - monthly_debt_service;
        }

        function annual_cash_flows_remaining(property) {
          var annual_debt_service = 12 * property_service.monthly_loan_payment(property);
          var expenses = operating_expenses_service.all_operating_expenses(property);
          var annual_cash_available_for_loan_servicing = property_service.get_net_annual_operating_incomes(
            property,
            expenses);

          return _.map(annual_cash_available_for_loan_servicing, function(cash) {
            return cash - annual_debt_service;
          });
        }
      }, true);
    }
  }
});
