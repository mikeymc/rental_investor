angular.module('rentals').directive('financingAssumptions', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/financingAssumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        var property = $scope.rentalProperty;

        $scope.equityPercentage = property.financingAndIncomeAssumption.equityPercentage;
        $scope.totalClosingCosts = propertyService.getClosingCosts(property);
        $scope.totalCost = propertyService.getTotalCost(property);
        $scope.downPayment = propertyService.getDownPayment(property);
        $scope.balanceToFinancePercentage = propertyService.getPercentToFinance(property);
        $scope.balanceToFinance = propertyService.getBalanceToFinance(property);
        $scope.monthlyInterestRate = property.financingAndIncomeAssumption.loanInterestRate / 12;
        $scope.amortizationPeriodInMonths = property.financingAndIncomeAssumption.amortizationPeriodInYears * 12;
        $scope.monthlyLoanPayment = propertyService.getMonthlyLoanPayment(property);
        $scope.annualLoanPayment = $scope.monthlyLoanPayment * 12;

      }, true);
    }
  }
});
