angular.module('rentals').directive('netOperatingIncome', function(operatingExpensesService, noiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/netOperatingIncome.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        var expenses = operatingExpensesService.getAllOperatingExpenses($scope.rental_property);

        $scope.noiPercentage = 100 - expenses.total.percentage;
        $scope.netMonthlyIncome = noiService.getNetMonthlyIncome($scope.rental_property, expenses);
        $scope.netAnnualIncomes = noiService.getNetAnnualIncomes($scope.rental_property, expenses);
        $scope.monthlyBuildingDepreciation = noiService.getMonthlyBuildingDepreciation($scope.rental_property);
        $scope.annualBuildingDepreciation = noiService.getAnnualBuildingDepreciation($scope.rental_property);
        $scope.monthlyInterestOnLoanAsPercentage = noiService.getMonthlyInterestOnLoanPercentage($scope.rental_property);
        $scope.monthlyInterestOnLoan = noiService.getMonthlyInterestOnLoan($scope.rental_property);
        $scope.annualInterestOnLoan = noiService.getAnnualInterestOnLoan($scope.rental_property);
        $scope.monthlyNetIncomeBeforeTaxes = noiService.getMonthlyNetIncomeBeforeTaxes($scope.rental_property, expenses);
        $scope.monthlyNetIncomeAfterTaxes = noiService.getMonthlyNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.annualNetIncomeBeforeTaxes = noiService.getAnnualNetIncomeBeforeTaxes($scope.rental_property, expenses);
        $scope.annualNetIncomeAfterTaxes = noiService.getAnnualNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.incomeTaxRate = $scope.rental_property.operating_expenses_assumption.income_tax_rate;
        $scope.monthlyTaxes = noiService.getMonthlyTaxes($scope.rental_property, expenses);
        $scope.annualTaxes = noiService.getAnnualTaxes($scope.rental_property, expenses);

      }, true);
    }
  }
});
