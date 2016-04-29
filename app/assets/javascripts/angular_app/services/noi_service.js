angular.module('rentals').service('noi_service', function(property_service, cash_flow_service) {
  return {
    monthly_net_income_before_taxes: monthly_net_income_before_taxes,
    annual_net_income_before_taxes: annual_net_income_before_taxes,
    get_annual_building_depreciation: get_annual_building_depreciation,
    get_monthly_building_depreciation: get_monthly_building_depreciation,
    get_annual_interest_on_loan: get_annual_interest_on_loan,
    monthly_interest_on_loan_percentage: monthly_interest_on_loan_percentage,
    monthly_interest_on_loan: monthly_interest_on_loan,
    net_monthly_income: net_monthly_income,
    net_annual_incomes: net_annual_incomes
  };

  function monthly_net_income_before_taxes(property, expenses) {
    var income = net_monthly_income(property, expenses);
    var interest = monthly_interest_on_loan(property);
    var depreciation = get_monthly_building_depreciation(property);
    return income - interest - depreciation;
  }

  function annual_net_income_before_taxes(property, expenses) {
    var incomes = net_annual_incomes(property, expenses);
    var depreciation = get_annual_building_depreciation(property);
    var interest = get_annual_interest_on_loan(property);

    return _.map(incomes, function(income, index) {
      return income - depreciation - interest[index];
    })
  }

  function get_annual_building_depreciation(property) {
    return 12 * get_monthly_building_depreciation(property);
  }

  function get_monthly_building_depreciation(property) {
    return property.financing_and_income_assumption.building_cost / 27.5 / 12;
  }

  function get_annual_interest_on_loan(property) {
    var yearly_principal_reductions = cash_flow_service.yearly_cum_princ(property);
    var yearly_debt_service = cash_flow_service.annual_debt_service(property);

    return _.map(yearly_principal_reductions, function(reduction) {
      return yearly_debt_service - reduction;
    });
  }

  function monthly_interest_on_loan_percentage(property) {
    return 100 * monthly_interest_on_loan(property) / property_service.get_gross_operating_income(property);
  }

  function monthly_interest_on_loan(property) {
    return property_service.monthly_loan_payment(property) - cash_flow_service.monthly_cum_princ(property);
  }

  function net_monthly_income(property, expenses) {
    var gross_income = property_service.get_gross_operating_income(property);
    var total_monthly_expenses = expenses.total.monthly_cost;
    return gross_income - total_monthly_expenses;
  }

  function net_annual_incomes(property, expenses) {
    var incomes = property_service.get_projected_annual_gross_operating_incomes(property);
    return _.map(incomes, function(income, index) {
      return income - expenses.total.yearly_costs[index];
    });
  }
});