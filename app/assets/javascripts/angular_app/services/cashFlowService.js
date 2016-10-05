angular.module('rentals').service('cash_flow_service', function(propertyService, operating_expenses_service) {
  return {
    get_monthly_total_return: get_monthly_total_return,
    get_annual_total_returns: get_annual_total_returns,
    monthly_cum_princ: monthly_cum_princ,
    yearly_cum_princ: yearly_cum_princ,
    annual_debt_service: annual_debt_service,
    monthly_cash_flow_remaining: monthly_cash_flow_remaining,
    annual_cash_flows_remaining: annual_cash_flows_remaining,
    one_year_exit_net: one_year_exit_net,
    three_year_exit_nets: three_year_exit_nets,
    five_year_exit_nets: five_year_exit_nets
  };

  /* --- Private --- */

  function three_year_exit_nets(property, gain_on_sale) {
    function three_year_exit_gain(property) {
      var annual_principal_reductions = yearly_cum_princ(property);

      var values = [
        get_annual_total_returns(property)[2],
        annual_principal_reductions[0],
        annual_principal_reductions[1],
        propertyService.down_payment(property),
        gain_on_sale
      ];

      return _.reduce(values, function(memo, item) {
        return memo + parseFloat(item);
      }, 0);
    }

    var cfs = [];
    var annual_remaining_cash_flows = annual_cash_flows_remaining(property);
    cfs.push(annual_remaining_cash_flows[0]);
    cfs.push(annual_remaining_cash_flows[1]);
    cfs.push(three_year_exit_gain(property));

    return cfs;
  }

  function five_year_exit_nets(property, gain_on_sale) {
    function five_year_exit_gain(property) {
      var annual_principal_reductions = yearly_cum_princ(property);

      var values = [
        get_annual_total_returns(property)[4],
        annual_principal_reductions[0],
        annual_principal_reductions[1],
        annual_principal_reductions[2],
        annual_principal_reductions[3],
        propertyService.down_payment(property),
        gain_on_sale
      ];

      return _.reduce(values, function(memo, item) {
        return memo + parseFloat(item);
      }, 0);
    }

    var cfs = [];
    var annual_remaining_cash_flows = annual_cash_flows_remaining(property);
    cfs.push(annual_remaining_cash_flows[0]);
    cfs.push(annual_remaining_cash_flows[1]);
    cfs.push(annual_remaining_cash_flows[2]);
    cfs.push(annual_remaining_cash_flows[3]);
    cfs.push(five_year_exit_gain(property));

    return cfs;
  }

  function one_year_exit_net(property) {
    var down_payment = propertyService.down_payment(property);
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
    var rate = propertyService.getMonthlyInterestRate(property);
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;
    var balance = propertyService.getBalanceToFinance(property);

    return cum_princ(rate, num_payments, balance, 1, 1, 0);
  }

  function yearly_cum_princ(property) {
    var rate = propertyService.getMonthlyInterestRate(property);
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;
    var balance = propertyService.getBalanceToFinance(property);

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
    return 12 * propertyService.getMonthlyLoanPayment(property);
  }

  function monthly_cash_flow_remaining(property) {
    var monthly_debt_service = propertyService.getMonthlyLoanPayment(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var cash_available = propertyService.getNetOperatingIncome(property, expenses);

    return cash_available - monthly_debt_service;
  }

  function annual_cash_flows_remaining(property) {
    var annual_debt_service = 12 * propertyService.getMonthlyLoanPayment(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var annual_cash_available_for_loan_servicing = propertyService.getNetAnnualOperatingIncomes(
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
