angular.module('rentals').service('roi_service', function(propertyService, operating_expenses_service, noiService, cashFlowService) {
  return {
    annual_noi_roi: annual_noi_roi,
    cash_roi: cash_roi,
    total_roi: total_roi
  };

  /* --- Private --- */

  function annual_noi_roi(property) {
    var down_payment = propertyService.getDownPayment(property);
    var operating_expenses_each_year = operating_expenses_service.all_operating_expenses(property).total.yearly_costs;
    var gross_incomes_each_year = propertyService.getProjectedAnnualGrossOperatingIncomes(property);
    var interest_on_loan_each_year = noiService.get_annual_interest_on_loan(property);
    var depreciation_each_year = noiService.getAnnualBuildingDepreciation(property);

    return _.map(gross_incomes_each_year, function(gross_income_for_the_year, year) {
      return 100 * (gross_income_for_the_year - operating_expenses_each_year[year] - interest_on_loan_each_year[year] - depreciation_each_year) / down_payment;
    });
  }

  function cash_roi(property) {
    var remaining_cash_flow_each_year = cashFlowService.getAnnualCashFlowsRemaining(property);
    var down_payment_on_the_property = propertyService.getDownPayment(property);

    return _.map(remaining_cash_flow_each_year, function(cash_flow_that_year) {
      return 100 * cash_flow_that_year / down_payment_on_the_property;
    });
  }

  function total_roi(property) {
    var down_payment = propertyService.getDownPayment(property);
    var remaining_annual_cash_flows = cashFlowService.getAnnualCashFlowsRemaining(property);
    var yearly_cumulative_payment_on_the_principal = cashFlowService.getAnnualCumPrincs(property);

    return _.map(remaining_annual_cash_flows, function(remaining_cash_flow_this_year, year) {
      return 100 * (remaining_cash_flow_this_year + yearly_cumulative_payment_on_the_principal[year]) / down_payment;
    });
  }
});
