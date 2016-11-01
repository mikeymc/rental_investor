angular.module('rentals').directive('cashFlowFromOperations', function(propertyService, operatingExpensesService, cashFlowService, noiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/cashFlowFromOperations.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        var expenses = operatingExpensesService.getAllOperatingExpenses($scope.rentalProperty);

        $scope.monthlyDebtService = propertyService.getMonthlyLoanPayment($scope.rentalProperty);
        $scope.annualDebtService = cashFlowService.getAnnualDebtService($scope.rentalProperty);
        $scope.cashAvailable = propertyService.getNetOperatingIncome($scope.rentalProperty, expenses);
        $scope.annualCashAvailable = propertyService.getNetAnnualOperatingIncomes($scope.rentalProperty, expenses);
        $scope.monthlyCashFlowRemaining = cashFlowService.getMonthlyCashFlowRemaining($scope.rentalProperty);
        $scope.annualCashFlowsRemaining = cashFlowService.getAnnualCashFlowsRemaining($scope.rentalProperty);
        $scope.monthlyPrincipalReduction = cashFlowService.getMonthlyCumPrinc($scope.rentalProperty);
        $scope.yearlyPrincipalReductions = cashFlowService.getAnnualCumPrincs($scope.rentalProperty);
        $scope.monthlyTotalReturn = cashFlowService.getMonthlyTotalReturn($scope.rentalProperty);
        $scope.annualTotalReturns = cashFlowService.getAnnualTotalReturns($scope.rentalProperty);
        $scope.monthlyCashFlowDebtServicingRatio = monthlyCashFlowDebtServicingRatio($scope.rentalProperty);
        $scope.annualCashFlowDebtServicingRatio = annualCashFlowDebtServicingRatio($scope.rentalProperty);
        $scope.monthlyNetIncomeAfterTaxes = noiService.getMonthlyNetIncomeAfterTaxes($scope.rentalProperty, expenses);
        $scope.annualNetIncomeAfterTaxes = noiService.getAnnualNetIncomeAfterTaxes($scope.rentalProperty, expenses);
        $scope.monthlyBuildingDepreciation = noiService.getMonthlyBuildingDepreciation($scope.rentalProperty);
        $scope.annualBuildingDepreciation = noiService.getAnnualBuildingDepreciation($scope.rentalProperty);
        $scope.monthlyInterestOnLoan = noiService.getMonthlyInterestOnLoan($scope.rentalProperty);
        $scope.annualInterestOnLoan = noiService.getAnnualInterestOnLoan($scope.rentalProperty);
        $scope.monthlyTotalCashFlowFromOperations = monthlyTotalCashFlowFromOperations($scope.rentalProperty, expenses);
        $scope.annualTotalCashFlowFromOperations = annualTotalCashFlowFromOperations($scope.rentalProperty, expenses);

        /* --- Private --- */

        function monthlyTotalCashFlowFromOperations(property, expenses) {
          var depreciation = noiService.getMonthlyBuildingDepreciation(property);
          var incomeAfterTaxes = noiService.getMonthlyNetIncomeAfterTaxes(property, expenses);

          return depreciation + incomeAfterTaxes;
        }

        function annualTotalCashFlowFromOperations(property, expenses) {
          var depreciation = noiService.getAnnualBuildingDepreciation(property);
          var incomeAfterTaxes = noiService.getAnnualNetIncomeAfterTaxes(property, expenses);

          return _.map(incomeAfterTaxes, function(income) {
            return depreciation + income;
          });
        }

        function annualCashFlowDebtServicingRatio(property) {
          var expenses = operatingExpensesService.getAllOperatingExpenses(property);
          var annualCashAvailable = propertyService.getNetAnnualOperatingIncomes(property, expenses);
          var annualDebtService = cashFlowService.getAnnualDebtService(property);

          return _.map(annualCashAvailable, function(cash) {
            return 100 * cash / annualDebtService;
          });
        }

        function monthlyCashFlowDebtServicingRatio(property) {
          var expenses = operatingExpensesService.getAllOperatingExpenses(property);
          var monthlyDebtService = propertyService.getMonthlyLoanPayment(property);
          var cashAvailable = propertyService.getNetOperatingIncome(property, expenses);

          return 100 * cashAvailable / monthlyDebtService;
        }
      }, true);
    }
  }
});
