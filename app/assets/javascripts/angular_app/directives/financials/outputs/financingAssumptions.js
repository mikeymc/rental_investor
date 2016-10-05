angular.module('rentals').directive('financingAssumptions', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/financingAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var property = $scope.rental_property;

        $scope.equity_percentage = property.financing_and_income_assumption.equity_percentage;
        $scope.total_closing_costs = property_service.getClosingCosts(property);
        $scope.total_cost = property_service.getTotalCost(property);
        $scope.down_payment = property_service.down_payment(property);
        $scope.balance_to_finance_percentage = property_service.getPercentToFinance(property);
        $scope.balance_to_finance = property_service.getBalanceToFinance(property);
        $scope.monthly_interest_rate = property.financing_and_income_assumption.loan_interest_rate / 12;
        $scope.amortization_period_in_months = property.financing_and_income_assumption.amortization_period_in_years * 12;
        $scope.monthly_loan_payment = property_service.getMonthlyLoanPayment(property);
        $scope.annual_loan_payment = $scope.monthly_loan_payment * 12;

      }, true);
    }
  }
});
