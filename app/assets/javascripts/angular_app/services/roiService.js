angular.module('rentals').service('roiService', function(propertyService, operatingExpensesService, noiService, cashFlowService) {
  return {
    getAnnualNetOperatingIncome: getAnnualNetOperatingIncome,
    getCashOnCashReturn: getCashOnCashReturn,
    getTotalReturnOnInvestment: getTotalReturnOnInvestment
  };

  /* --- Private --- */

  function getAnnualNetOperatingIncome(property) {
    var downPaymentOnProperty = propertyService.getDownPayment(property);
    var operatingExpensesEachYear = operatingExpensesService.getAllOperatingExpenses(property).total.yearlyCosts;
    var grossIncomeEachYear = propertyService.getProjectedAnnualGrossOperatingIncomes(property);
    var interestOnTheLoanEachYear = noiService.getAnnualInterestOnLoan(property);
    var depreciationAmountEachYear = noiService.getAnnualBuildingDepreciation(property);

    return _.map(grossIncomeEachYear, function(grossIncomeThatYear, year) {
      return 100 * (grossIncomeThatYear - operatingExpensesEachYear[year] - interestOnTheLoanEachYear[year] - depreciationAmountEachYear) / downPaymentOnProperty;
    });
  }

  function getCashOnCashReturn(property) {
    var remainingCashFlowEachYear = cashFlowService.getAnnualCashFlowsRemaining(property);
    var downPaymentOnTheProperty = propertyService.getDownPayment(property);

    return _.map(remainingCashFlowEachYear, function(cashFlowThatYear) {
      return 100 * cashFlowThatYear / downPaymentOnTheProperty;
    });
  }

  function getTotalReturnOnInvestment(property) {
    var downPaymentOnTheProperty = propertyService.getDownPayment(property);
    var remainingCashFlowEachYear = cashFlowService.getAnnualCashFlowsRemaining(property);
    var cumulativePaymentOnThePrincipalEachYear = cashFlowService.getAnnualCumPrincs(property);

    return _.map(remainingCashFlowEachYear, function(remainingCashFlowThatYear, year) {
      return 100 * (remainingCashFlowThatYear + cumulativePaymentOnThePrincipalEachYear[year]) / downPaymentOnTheProperty;
    });
  }
});
