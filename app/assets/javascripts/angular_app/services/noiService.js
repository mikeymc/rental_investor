angular.module('rentals').service('noiService', function(propertyService, cashFlowService) {
  return {
    getMonthlyNetIncomeBeforeTaxes: getMonthlyNetIncomeBeforeTaxes,
    getMonthlyNetIncomeAfterTaxes: getMonthlyNetIncomeAfterTaxes,
    getAnnualNetIncomeBeforeTaxes: getAnnualNetIncomeBeforeTaxes,
    getAnnualNetIncomeAfterTaxes: getAnnualNetIncomeAfterTaxes,
    getAnnualBuildingDepreciation: getAnnualBuildingDepreciation,
    getMonthlyBuildingDepreciation: getMonthlyBuildingDepreciation,
    getAnnualInterestOnLoan: getAnnualInterestOnLoan,
    getMonthlyInterestOnLoanPercentage: getMonthlyInterestOnLoanPercentage,
    getMonthlyInterestOnLoan: getMonthlyInterestOnLoan,
    getNetMonthlyIncome: getNetMonthlyIncome,
    getNetAnnualIncomes: getNetAnnualIncomes,
    getAnnualTaxes: getAnnualTaxes,
    getMonthlyTaxes: getMonthlyTaxes
  };

  function getMonthlyNetIncomeBeforeTaxes(property, expenses) {
    var income = getNetMonthlyIncome(property, expenses);
    var interest = getMonthlyInterestOnLoan(property);
    var depreciation = getMonthlyBuildingDepreciation(property);
    return income - interest - depreciation;
  }

  function getMonthlyNetIncomeAfterTaxes(property, expenses) {
    var monthlyNetIncomeBeforeTaxes = getMonthlyNetIncomeBeforeTaxes(property, expenses);
    var monthlyTaxes = getMonthlyTaxes(property, expenses);

    return monthlyNetIncomeBeforeTaxes - monthlyTaxes;
  }

  function getAnnualNetIncomeBeforeTaxes(property, expenses) {
    var netAnnualIncomes = getNetAnnualIncomes(property, expenses);
    var annualBuildingDepreciation = getAnnualBuildingDepreciation(property);
    var annualInterestOnLoan = getAnnualInterestOnLoan(property);

    return _.map(netAnnualIncomes, function(incomeForTheYear, year) {
      return incomeForTheYear - annualBuildingDepreciation - annualInterestOnLoan[year];
    })
  }

  function getAnnualNetIncomeAfterTaxes(property, expenses) {
    var annualNetIncomeBeforeTaxes = getAnnualNetIncomeBeforeTaxes(property, expenses);
    var annualTaxes = getAnnualTaxes(property, expenses);

    return _.map(annualNetIncomeBeforeTaxes, function(income, year) {
      return income - annualTaxes[year];
    })
  }

  function getAnnualBuildingDepreciation(property) {
    return 12 * getMonthlyBuildingDepreciation(property);
  }

  function getMonthlyBuildingDepreciation(property) {
    return property.financingAndIncomeAssumption.buildingCost / 27.5 / 12;
  }

  function getAnnualInterestOnLoan(property) {
    var annualPrincipalReductions = cashFlowService.getAnnualCumPrincs(property);
    var annualDebtService = cashFlowService.getAnnualDebtService(property);

    return _.map(annualPrincipalReductions, function(principalReductionThisYear) {
      return annualDebtService - principalReductionThisYear;
    });
  }

  function getMonthlyInterestOnLoanPercentage(property) {
    return 100 * getMonthlyInterestOnLoan(property) / propertyService.getGrossOperatingIncome(property);
  }

  function getMonthlyInterestOnLoan(property) {
    return propertyService.getMonthlyLoanPayment(property) - cashFlowService.getMonthlyCumPrinc(property);
  }

  function getNetMonthlyIncome(property, expenses) {
    var grossOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var totalMonthlyExpenses = expenses.total.monthlyCost;
    return grossOperatingIncome - totalMonthlyExpenses;
  }

  function getNetAnnualIncomes(property, expenses) {
    var incomes = propertyService.getProjectedAnnualGrossOperatingIncomes(property);
    return _.map(incomes, function(income, index) {
      return income - expenses.total.yearlyCosts[index];
    });
  }

  function getMonthlyTaxes(property, expenses) {
    var taxRate = property.operatingExpensesAssumption.incomeTaxRate / 100;
    var netMonthlyIncomeBeforeTaxes = getMonthlyNetIncomeBeforeTaxes(property, expenses);

    return taxRate * netMonthlyIncomeBeforeTaxes;
  }

  function getAnnualTaxes(property, expenses) {
    var taxRate = property.operatingExpensesAssumption.incomeTaxRate / 100;
    var annualNetIncomeBeforeTaxes = getAnnualNetIncomeBeforeTaxes(property, expenses);

    return _.map(annualNetIncomeBeforeTaxes, function(netIncomeBeforeTaxesThisYear) {
      return taxRate * netIncomeBeforeTaxesThisYear;
    });
  }
});
