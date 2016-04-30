angular.module('rentals').service('cash_flow_service', function(property_service, operating_expenses_service) {
  return {
    get_monthly_total_return: get_monthly_total_return,
    get_annual_total_returns: get_annual_total_returns,
    monthly_cum_princ: monthly_cum_princ,
    yearly_cum_princ: yearly_cum_princ,
    annual_debt_service: annual_debt_service,
    monthly_cash_flow_remaining: monthly_cash_flow_remaining,
    annual_cash_flows_remaining: annual_cash_flows_remaining,
    one_year_exit_net: one_year_exit_net
  };

  /* --- Private --- */

  function one_year_exit_net(property) {
    var down_payment = property_service.down_payment(property);
    var total_return = get_annual_total_returns(property)[0];

    return down_payment + total_return;
  }

  function get_monthly_total_return(property) {
    return monthly_cash_flow_remaining(property) + monthly_cum_princ(property);
  }

  function get_annual_total_returns(property) {
    var yearly_principal_reductions = yearly_cum_princ(property);
    var yearly_cf_remaining = annual_cash_flows_remaining(property);
    return _.map(yearly_principal_reductions, function(reduction, index) {
      return reduction + yearly_cf_remaining[index];
    });
  }

  function monthly_cum_princ(property) {
    var rate = property_service.get_monthly_interest_rate(property);
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;
    var balance = property_service.balance_to_finance(property);

    return cum_princ(rate, num_payments, balance, 1, 1, 0);
  }

  function yearly_cum_princ(property) {
    var rate = property_service.get_monthly_interest_rate(property);
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;
    var balance = property_service.balance_to_finance(property);

    var start = 1;
    var end = 12;
    var years = [];

    for (var i = 0; i < 5; i++) {
      years[i] = cum_princ(rate, num_payments, balance, start, end);
      start += 12;
      end += 12;
    }

    return years;
  }

  function annual_debt_service(property) {
    return 12 * property_service.monthly_loan_payment(property);
  }

  function monthly_cash_flow_remaining(property) {
    var monthly_debt_service = property_service.monthly_loan_payment(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var cash_available = property_service.get_net_operating_income(property, expenses);

    return cash_available - monthly_debt_service;
  }

  function annual_cash_flows_remaining(property) {
    var annual_debt_service = 12 * property_service.monthly_loan_payment(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var annual_cash_available_for_loan_servicing = property_service.get_net_annual_operating_incomes(
      property,
      expenses);

    return _.map(annual_cash_available_for_loan_servicing, function(cash) {
      return cash - annual_debt_service;
    });
  }

  function cum_princ(monthly_interest_rate, num_payments, balance, start, end) {
    function calculate_monthly_payment(interest, balance, num_payments) {
      var numerator = interest * balance * Math.pow(1 + interest, num_payments);
      var denominator = Math.pow(1 + interest, num_payments) - 1;
      return numerator / denominator;
    }

    function calculate_remaining_balance(interest, balance, monthly_payment) {
      var rate_to_now = Math.pow((1 + interest), start - 1);
      return (rate_to_now * balance) - ((rate_to_now - 1) / interest * monthly_payment);
    }

    var interest = monthly_interest_rate / 100;
    var monthly_payment = calculate_monthly_payment(interest, balance, num_payments);
    var remaining_balance = calculate_remaining_balance(interest, balance, monthly_payment);

    var principal = 0;
    for (var i = start; i <= end; i++) {
      var monthly_interest = remaining_balance * interest;
      var monthly_principal = monthly_payment - monthly_interest;
      principal += monthly_principal;
      remaining_balance -= monthly_principal;
    }

    return principal;
  }
});
