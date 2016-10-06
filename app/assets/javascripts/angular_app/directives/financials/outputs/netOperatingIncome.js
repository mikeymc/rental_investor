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

        $scope.noi_percentage = 100 - expenses.total.percentage;
        $scope.net_monthly_income = noiService.getNetMonthlyIncome($scope.rental_property, expenses);
        $scope.net_annual_incomes = noiService.getNetAnnualIncomes($scope.rental_property, expenses);
        $scope.monthly_building_depreciation = noiService.getMonthlyBuildingDepreciation($scope.rental_property);
        $scope.annual_building_depreciation = noiService.getAnnualBuildingDepreciation($scope.rental_property);
        $scope.monthly_interest_on_loan_percentage = noiService.getMonthlyInterestOnLoanPercentage($scope.rental_property);
        $scope.monthly_interest_on_loan = noiService.getMonthlyInterestOnLoan($scope.rental_property);
        $scope.annual_interest_on_loan = noiService.getAnnualInterestOnLoan($scope.rental_property);
        $scope.monthly_net_income_before_taxes = noiService.getMonthlyNetIncomeBeforeTaxes($scope.rental_property, expenses);
        $scope.monthly_net_income_after_taxes = noiService.getMonthlyNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.annual_net_income_before_taxes = noiService.getAnnualNetIncomeBeforeTaxes($scope.rental_property, expenses);
        $scope.annual_net_income_after_taxes = noiService.getAnnualNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.income_tax_rate = $scope.rental_property.operating_expenses_assumption.income_tax_rate;
        $scope.monthly_taxes = noiService.getMonthlyTaxes($scope.rental_property, expenses);
        $scope.annual_taxes = noiService.getAnnualTaxes($scope.rental_property, expenses);

      }, true);
    }
  }
});
