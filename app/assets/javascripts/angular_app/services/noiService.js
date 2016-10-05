angular.module('rentals').service('noiService', function(propertyService, cashFlowService) {
  return {
    monthly_net_income_before_taxes: getMonthlyNetIncomeBeforeTaxes,
    monthly_net_income_after_taxes: getMonthlyNetIncomeAfterTaxes,
    annual_net_income_before_taxes: getAnnualNetIncomeBeforeTaxes,
    annual_net_income_after_taxes: getAnnualNetIncomeAfterTaxes,
    get_annual_building_depreciation: getAnnualBuildingDepreciation,
    get_monthly_building_depreciation: getMonthlyBuildingDepreciation,
    get_annual_interest_on_loan: getAnnualInterestOnLoan,
    monthly_interest_on_loan_percentage: getMonthlyInterestOnLoanPercentage,
    monthly_interest_on_loan: getMonthlyInterestOnLoan,
    net_monthly_income: getNetMonthlyIncome,
    net_annual_incomes: getNetAnnualIncomes,
    annual_taxes: getAnnualTaxes,
    monthly_taxes: getMonthlyTaxes
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
    return property.financing_and_income_assumption.building_cost / 27.5 / 12;
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
    var totalMonthlyExpenses = expenses.total.monthly_cost;
    return grossOperatingIncome - totalMonthlyExpenses;
  }

  function getNetAnnualIncomes(property, expenses) {
    var incomes = propertyService.getProjectedAnnualGrossOperatingIncomes(property);
    return _.map(incomes, function(income, index) {
      return income - expenses.total.yearly_costs[index];
    });
  }

  function getMonthlyTaxes(property, expenses) {
    var taxRate = property.operating_expenses_assumption.income_tax_rate / 100;
    var netMonthlyIncomeBeforeTaxes = getMonthlyNetIncomeBeforeTaxes(property, expenses);

    return taxRate * netMonthlyIncomeBeforeTaxes;
  }

  function getAnnualTaxes(property, expenses) {
    var taxRate = property.operating_expenses_assumption.income_tax_rate / 100;
    var annualNetIncomeBeforeTaxes = getAnnualNetIncomeBeforeTaxes(property, expenses);

    return _.map(annualNetIncomeBeforeTaxes, function(netIncomeBeforeTaxesThisYear) {
      return taxRate * netIncomeBeforeTaxesThisYear;
    });
  }
});
