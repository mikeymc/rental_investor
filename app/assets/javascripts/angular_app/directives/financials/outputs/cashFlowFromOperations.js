angular.module('rentals').directive('cashFlowFromOperations', function(propertyService, operatingExpensesService, cashFlowService, noiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/cashFlowFromOperations.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var expenses = operatingExpensesService.getAllOperatingExpenses($scope.rental_property);

        $scope.monthlyDebtService = propertyService.getMonthlyLoanPayment($scope.rental_property);
        $scope.annualDebtService = cashFlowService.getAnnualDebtService($scope.rental_property);
        $scope.cashAvailable = propertyService.getNetOperatingIncome($scope.rental_property, expenses);
        $scope.annualCashAvailable = propertyService.getNetAnnualOperatingIncomes($scope.rental_property, expenses);
        $scope.monthlyCashFlowRemaining = cashFlowService.getMonthlyCashFlowRemaining($scope.rental_property);
        $scope.annualCashFlowsRemaining = cashFlowService.getAnnualCashFlowsRemaining($scope.rental_property);
        $scope.monthlyPrincipalReduction = cashFlowService.getMonthlyCumPrinc($scope.rental_property);
        $scope.yearlyPrincipalReductions = cashFlowService.getAnnualCumPrincs($scope.rental_property);
        $scope.monthlyTotalReturn = cashFlowService.getMonthlyTotalReturn($scope.rental_property);
        $scope.annualTotalReturns = cashFlowService.getAnnualTotalReturns($scope.rental_property);
        $scope.monthlyCashFlowDebtServicingRatio = monthlyCashFlowDebtServicingRatio($scope.rental_property);
        $scope.annualCashFlowDebtServicingRatio = annualCashFlowDebtServicingRatio($scope.rental_property);
        $scope.monthlyNetIncomeAfterTaxes = noiService.getMonthlyNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.annualNetIncomeAfterTaxes = noiService.getAnnualNetIncomeAfterTaxes($scope.rental_property, expenses);
        $scope.monthlyBuildingDepreciation = noiService.getMonthlyBuildingDepreciation($scope.rental_property);
        $scope.annualBuildingDepreciation = noiService.getAnnualBuildingDepreciation($scope.rental_property);
        $scope.monthlyInterestOnLoan = noiService.getMonthlyInterestOnLoan($scope.rental_property);
        $scope.annualInterestOnLoan = noiService.getAnnualInterestOnLoan($scope.rental_property);
        $scope.monthlyTotalCashFlowFromOperations = monthlyTotalCashFlowFromOperations($scope.rental_property, expenses);
        $scope.annualTotalCashFlowFromOperations = annualTotalCashFlowFromOperations($scope.rental_property, expenses);

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
