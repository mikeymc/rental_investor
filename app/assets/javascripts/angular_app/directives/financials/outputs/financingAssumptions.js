angular.module('rentals').directive('financingAssumptions', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/financingAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var property = $scope.rental_property;

        $scope.equityPercentage = property.financing_and_income_assumption.equity_percentage;
        $scope.totalClosingCosts = propertyService.getClosingCosts(property);
        $scope.totalCost = propertyService.getTotalCost(property);
        $scope.downPayment = propertyService.getDownPayment(property);
        $scope.balanceToFinancePercentage = propertyService.getPercentToFinance(property);
        $scope.balanceToFinance = propertyService.getBalanceToFinance(property);
        $scope.monthlyInterestRate = property.financing_and_income_assumption.loan_interest_rate / 12;
        $scope.amortizationPeriodInMonths = property.financing_and_income_assumption.amortization_period_in_years * 12;
        $scope.monthlyLoanPayment = propertyService.getMonthlyLoanPayment(property);
        $scope.annualLoanPayment = $scope.monthlyLoanPayment * 12;

      }, true);
    }
  }
});
