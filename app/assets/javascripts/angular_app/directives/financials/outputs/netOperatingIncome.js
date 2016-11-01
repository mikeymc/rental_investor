angular.module('rentals').directive('netOperatingIncome', function(operatingExpensesService, noiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/netOperatingIncome.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }
        var expenses = operatingExpensesService.getAllOperatingExpenses($scope.rentalProperty);

        $scope.noiPercentage = 100 - expenses.total.percentage;
        $scope.netMonthlyIncome = noiService.getNetMonthlyIncome($scope.rentalProperty, expenses);
        $scope.netAnnualIncomes = noiService.getNetAnnualIncomes($scope.rentalProperty, expenses);
        $scope.monthlyBuildingDepreciation = noiService.getMonthlyBuildingDepreciation($scope.rentalProperty);
        $scope.annualBuildingDepreciation = noiService.getAnnualBuildingDepreciation($scope.rentalProperty);
        $scope.monthlyInterestOnLoanAsPercentage = noiService.getMonthlyInterestOnLoanPercentage($scope.rentalProperty);
        $scope.monthlyInterestOnLoan = noiService.getMonthlyInterestOnLoan($scope.rentalProperty);
        $scope.annualInterestOnLoan = noiService.getAnnualInterestOnLoan($scope.rentalProperty);
        $scope.monthlyNetIncomeBeforeTaxes = noiService.getMonthlyNetIncomeBeforeTaxes($scope.rentalProperty, expenses);
        $scope.monthlyNetIncomeAfterTaxes = noiService.getMonthlyNetIncomeAfterTaxes($scope.rentalProperty, expenses);
        $scope.annualNetIncomeBeforeTaxes = noiService.getAnnualNetIncomeBeforeTaxes($scope.rentalProperty, expenses);
        $scope.annualNetIncomeAfterTaxes = noiService.getAnnualNetIncomeAfterTaxes($scope.rentalProperty, expenses);
        $scope.incomeTaxRate = $scope.rentalProperty.operatingExpensesAssumption.incomeTaxRate;
        $scope.monthlyTaxes = noiService.getMonthlyTaxes($scope.rentalProperty, expenses);
        $scope.annualTaxes = noiService.getAnnualTaxes($scope.rentalProperty, expenses);

      }, true);
    }
  }
});
