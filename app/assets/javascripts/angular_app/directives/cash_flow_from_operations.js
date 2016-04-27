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
        var monthly_interest_rate = property_service.get_monthly_interest_rate($scope.rental_property);
        var number_of_payments = $scope.rental_property.financing_and_income_assumption.amortization_period_in_years * 12;
        var balance_to_finance = property_service.balance_to_finance($scope.rental_property);

        $scope.monthly_debt_service = property_service.monthly_loan_payment($scope.rental_property);
        $scope.annual_debt_service = annual_debt_service($scope.rental_property);
        $scope.cash_available = property_service.get_net_operating_income($scope.rental_property, expenses);
        $scope.annual_cash_available = property_service.get_net_annual_operating_incomes($scope.rental_property, expenses);
        $scope.monthly_cf_remaining = monthly_cash_flow_remaining($scope.rental_property);
        $scope.annual_cfs_remaining = annual_cash_flows_remaining($scope.rental_property);
        $scope.monthly_principal_reduction = cum_princ(monthly_interest_rate, number_of_payments, balance_to_finance, 1, 1, 0);
        $scope.monthly_principal_reduction = cum_princ(monthly_interest_rate, number_of_payments, balance_to_finance, 1, 1, 0);
        $scope.yearly_principal_reductions = yearly_cum_princ(monthly_interest_rate, number_of_payments, balance_to_finance);

        /* --- Private --- */

        function yearly_cum_princ(rate, num_payments, balance) {
          var start = 1;
          var end = 12;
          var years = [];

          for (var i = 0; i < 5; i++) {
            years[i] = cum_princ(rate, num_payments, balance, start, end);
            start += 12;
            end += 12;
          }

          return years;
        }

        function cum_princ(monthly_interest_rate, num_payments, balance, start, end) {
          function calculate_monthly_payment(interest, balance, num_payments) {
            var numerator = interest * balance * Math.pow(1 + interest, num_payments);
            var denominator = Math.pow(1 + interest, num_payments) - 1;
            return numerator / denominator;
          }

          function calculate_remaining_balance(interest, balance, monthly_payment) {
            var rate_to_now = Math.pow((1 + interest), start - 1);
            return (rate_to_now * balance) - ((rate_to_now - 1) / interest * monthly_payment);
          }

          var interest = monthly_interest_rate / 100;
          var monthly_payment = calculate_monthly_payment(interest, balance, num_payments);
          var remaining_balance = calculate_remaining_balance(interest, balance, monthly_payment);

          var principal = 0;
          for (var i = start; i <= end; i++) {
            var monthly_interest = remaining_balance * interest;
            var monthly_principal = monthly_payment - monthly_interest;
            principal += monthly_principal;
            remaining_balance -= monthly_principal;
          }

          return principal;
        }

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
