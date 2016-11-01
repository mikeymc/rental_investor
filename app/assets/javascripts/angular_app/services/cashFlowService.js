angular.module('rentals').service('cashFlowService', function(propertyService, operatingExpensesService) {
  return {
    getMonthlyTotalReturn: getMonthlyTotalReturn,
    getAnnualTotalReturns: getAnnualTotalReturns,
    getMonthlyCumPrinc: getMonthlyCumPrinc,
    getAnnualCumPrincs: getAnnualCumPrincs,
    getAnnualDebtService: getAnnualDebtService,
    getMonthlyCashFlowRemaining: getMonthlyCashFlowRemaining,
    getAnnualCashFlowsRemaining: getAnnualCashFlowsRemaining,
    getOneYearExitNet: getOneYearExitNet,
    getThreeYearExitNets: getThreeYearExitNets,
    getFiveYearExitNets: getFiveYearExitNets
  };

  /* --- Private --- */

  function getThreeYearExitNets(property, gainOnSale) {
    function threeYearExitGain(property) {
      var annualPrincipalReductions = getAnnualCumPrincs(property);

      var values = [
        getAnnualTotalReturns(property)[2],
        annualPrincipalReductions[0],
        annualPrincipalReductions[1],
        propertyService.getDownPayment(property),
        gainOnSale
      ];

      return _.reduce(values, function(memo, item) {
        return memo + parseFloat(item);
      }, 0);
    }

    var cfs = [];
    var annualRemainingCashFlows = getAnnualCashFlowsRemaining(property);
    cfs.push(annualRemainingCashFlows[0]);
    cfs.push(annualRemainingCashFlows[1]);
    cfs.push(threeYearExitGain(property));

    return cfs;
  }

  function getFiveYearExitNets(property, gain_on_sale) {
    function fiveYearExitGain(property) {
      var annualPrincipalReductions = getAnnualCumPrincs(property);

      var values = [
        getAnnualTotalReturns(property)[4],
        annualPrincipalReductions[0],
        annualPrincipalReductions[1],
        annualPrincipalReductions[2],
        annualPrincipalReductions[3],
        propertyService.getDownPayment(property),
        gain_on_sale
      ];

      return _.reduce(values, function(memo, item) {
        return memo + parseFloat(item);
      }, 0);
    }

    var cfs = [];
    var annualRemainingCashFlows = getAnnualCashFlowsRemaining(property);
    cfs.push(annualRemainingCashFlows[0]);
    cfs.push(annualRemainingCashFlows[1]);
    cfs.push(annualRemainingCashFlows[2]);
    cfs.push(annualRemainingCashFlows[3]);
    cfs.push(fiveYearExitGain(property));

    return cfs;
  }

  function getOneYearExitNet(property) {
    var downPayment = propertyService.getDownPayment(property);
    var totalReturn = getAnnualTotalReturns(property)[0];

    return downPayment + totalReturn;
  }

  function getMonthlyTotalReturn(property) {
    return getMonthlyCashFlowRemaining(property) + getMonthlyCumPrinc(property);
  }

  function getAnnualTotalReturns(property) {
    var yearlyPrincipalReductions = getAnnualCumPrincs(property);
    var yearlyCashFlowsRemaining = getAnnualCashFlowsRemaining(property);
    return _.map(yearlyPrincipalReductions, function(principalReductionAmount, year) {
      return principalReductionAmount + yearlyCashFlowsRemaining[year];
    });
  }

  function getMonthlyCumPrinc(property) {
    var rate = propertyService.getMonthlyInterestRate(property);
    var numberOfPayments = property.financingAndIncomeAssumption.amortizationPeriodInYears * 12;
    var balance = propertyService.getBalanceToFinance(property);

    return cumPrinc(rate, numberOfPayments, balance, 1, 1, 0);
  }

  function getAnnualCumPrincs(property) {
    var rate = propertyService.getMonthlyInterestRate(property);
    var numberOfPayments = property.financingAndIncomeAssumption.amortizationPeriodInYears * 12;
    var balance = propertyService.getBalanceToFinance(property);

    var start = 1;
    var end = 12;
    var years = [];

    for (var i = 0; i < 5; i++) {
      years[i] = cumPrinc(rate, numberOfPayments, balance, start, end);
      start += 12;
      end += 12;
    }

    return years;
  }

  function getAnnualDebtService(property) {
    return 12 * propertyService.getMonthlyLoanPayment(property);
  }

  function getMonthlyCashFlowRemaining(property) {
    var monthlyDebtService = propertyService.getMonthlyLoanPayment(property);
    var expenses = operatingExpensesService.getAllOperatingExpenses(property);
    var cashAvailable = propertyService.getNetOperatingIncome(property, expenses);

    return cashAvailable - monthlyDebtService;
  }

  function getAnnualCashFlowsRemaining(property) {
    var annualDebtService = 12 * propertyService.getMonthlyLoanPayment(property);
    var expenses = operatingExpensesService.getAllOperatingExpenses(property);
    var annualCashAvailableForDebtFinancing = propertyService.getNetAnnualOperatingIncomes(property, expenses);

    return _.map(annualCashAvailableForDebtFinancing, function(cash) {
      return cash - annualDebtService;
    });
  }

  function cumPrinc(monthlyInterestRate, numberOfPayments, balance, start, end) {
    function calculateMonthlyPayment(interest, balance, numberOfPayments) {
      var numerator = interest * balance * Math.pow(1 + interest, numberOfPayments);
      var denominator = Math.pow(1 + interest, numberOfPayments) - 1;
      return numerator / denominator;
    }

    function calculateRemainingBalance(interest, balance, monthlyPaymentAmount) {
      var rateToNow = Math.pow((1 + interest), start - 1);
      return (rateToNow * balance) - ((rateToNow - 1) / interest * monthlyPaymentAmount);
    }

    var interest = monthlyInterestRate / 100;
    var monthlyPayment = calculateMonthlyPayment(interest, balance, numberOfPayments);
    var remainingBalance = calculateRemainingBalance(interest, balance, monthlyPayment);

    var principal = 0;
    for (var i = start; i <= end; i++) {
      var monthlyInterest = remainingBalance * interest;
      var monthlyPrincipal = monthlyPayment - monthlyInterest;
      principal += monthlyPrincipal;
      remainingBalance -= monthlyPrincipal;
    }

    return principal;
  }
});
