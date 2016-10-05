angular.module('rentals').service('roi_service', function(property_service, operating_expenses_service, noi_service, cash_flow_service) {
  return {
    annual_noi_roi: annual_noi_roi,
    cash_roi: cash_roi,
    total_roi: total_roi
  };

  /* --- Private --- */

  function annual_noi_roi(property) {
    var down_payment = property_service.down_payment(property);
    var operating_expenses_each_year = operating_expenses_service.all_operating_expenses(property).total.yearly_costs;
    var gross_incomes_each_year = property_service.getProjectedAnnualGrossOperatingIncomes(property);
    var interest_on_loan_each_year = noi_service.get_annual_interest_on_loan(property);
    var depreciation_each_year = noi_service.get_annual_building_depreciation(property);

    return _.map(gross_incomes_each_year, function(gross_income_for_the_year, year) {
      return 100 * (gross_income_for_the_year - operating_expenses_each_year[year] - interest_on_loan_each_year[year] - depreciation_each_year) / down_payment;
    });
  }

  function cash_roi(property) {
    var remaining_cash_flow_each_year = cash_flow_service.annual_cash_flows_remaining(property);
    var down_payment_on_the_property = property_service.down_payment(property);

    return _.map(remaining_cash_flow_each_year, function(cash_flow_that_year) {
      return 100 * cash_flow_that_year / down_payment_on_the_property;
    });
  }

  function total_roi(property) {
    var down_payment = property_service.down_payment(property);
    var remaining_annual_cash_flows = cash_flow_service.annual_cash_flows_remaining(property);
    var yearly_cumulative_payment_on_the_principal = cash_flow_service.yearly_cum_princ(property);

    return _.map(remaining_annual_cash_flows, function(remaining_cash_flow_this_year, year) {
      return 100 * (remaining_cash_flow_this_year + yearly_cumulative_payment_on_the_principal[year]) / down_payment;
    });
  }
});
