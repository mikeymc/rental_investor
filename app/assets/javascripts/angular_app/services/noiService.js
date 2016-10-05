angular.module('rentals').service('noi_service', function(propertyService, cashFlowService) {
  return {
    monthly_net_income_before_taxes: monthly_net_income_before_taxes,
    monthly_net_income_after_taxes: monthly_net_income_after_taxes,
    annual_net_income_before_taxes: annual_net_income_before_taxes,
    annual_net_income_after_taxes: annual_net_income_after_taxes,
    get_annual_building_depreciation: get_annual_building_depreciation,
    get_monthly_building_depreciation: get_monthly_building_depreciation,
    get_annual_interest_on_loan: get_annual_interest_on_loan,
    monthly_interest_on_loan_percentage: monthly_interest_on_loan_percentage,
    monthly_interest_on_loan: monthly_interest_on_loan,
    net_monthly_income: net_monthly_income,
    net_annual_incomes: net_annual_incomes,
    annual_taxes: annual_taxes,
    monthly_taxes: monthly_taxes
  };

  function monthly_net_income_before_taxes(property, expenses) {
    var income = net_monthly_income(property, expenses);
    var interest = monthly_interest_on_loan(property);
    var depreciation = get_monthly_building_depreciation(property);
    return income - interest - depreciation;
  }

  function monthly_net_income_after_taxes(property, expenses) {
    var before_taxes = monthly_net_income_before_taxes(property, expenses);
    var taxes = monthly_taxes(property, expenses);

    return before_taxes - taxes;
  }

  function annual_net_income_before_taxes(property, expenses) {
    var incomes = net_annual_incomes(property, expenses);
    var depreciation = get_annual_building_depreciation(property);
    var interest = get_annual_interest_on_loan(property);

    return _.map(incomes, function(income, index) {
      return income - depreciation - interest[index];
    })
  }

  function annual_net_income_after_taxes(property, expenses) {
    var incomes = annual_net_income_before_taxes(property, expenses);
    var taxes = annual_taxes(property, expenses);

    return _.map(incomes, function(income, index) {
      return income - taxes[index];
    })
  }

  function get_annual_building_depreciation(property) {
    return 12 * get_monthly_building_depreciation(property);
  }

  function get_monthly_building_depreciation(property) {
    return property.financing_and_income_assumption.building_cost / 27.5 / 12;
  }

  function get_annual_interest_on_loan(property) {
    var yearly_principal_reductions = cashFlowService.getAnnualCumPrincs(property);
    var yearly_debt_service = cashFlowService.getAnnualDebtService(property);

    return _.map(yearly_principal_reductions, function(reduction) {
      return yearly_debt_service - reduction;
    });
  }

  function monthly_interest_on_loan_percentage(property) {
    return 100 * monthly_interest_on_loan(property) / propertyService.getGrossOperatingIncome(property);
  }

  function monthly_interest_on_loan(property) {
    return propertyService.getMonthlyLoanPayment(property) - cashFlowService.getMonthlyCumPrinc(property);
  }

  function net_monthly_income(property, expenses) {
    var gross_income = propertyService.getGrossOperatingIncome(property);
    var total_monthly_expenses = expenses.total.monthly_cost;
    return gross_income - total_monthly_expenses;
  }

  function net_annual_incomes(property, expenses) {
    var incomes = propertyService.getProjectedAnnualGrossOperatingIncomes(property);
    return _.map(incomes, function(income, index) {
      return income - expenses.total.yearly_costs[index];
    });
  }

  function monthly_taxes(property, expenses) {
    var tax_rate = property.operating_expenses_assumption.income_tax_rate / 100;
    var income_before_taxes = monthly_net_income_before_taxes(property, expenses);

    return tax_rate * income_before_taxes;
  }

  function annual_taxes(property, expenses) {
    var tax_rate = property.operating_expenses_assumption.income_tax_rate / 100;
    var income_before_taxes = annual_net_income_before_taxes(property, expenses);

    return _.map(income_before_taxes, function(income) {
      return tax_rate * income;
    });
  }
});
