angular.module('rentals').service('property_service', function() {
  return {
    get_closing_costs: get_closing_costs,
    get_total_gross_monthly_income: get_total_gross_monthly_income,
    get_total_cost: get_total_cost,
    get_gross_monthly_rent: get_gross_monthly_rent,
    get_projected_average_rents: get_projected_average_rents,
    get_loan_origination_fee: get_loan_origination_fee,
    get_cost_per_unit: get_cost_per_unit,
    get_avg_area_per_unit: get_avg_area_per_unit,
    get_total_cost_per_sq_ft: get_total_cost_per_sq_ft,
    get_avg_rent_per_sq_ft: get_avg_rent_per_sq_ft,
    get_projected_other_incomes: get_projected_other_incomes,
    get_vacancy_operating_expense: get_vacancy_operating_expense,
    get_net_rental_income: get_net_rental_income,
    get_gross_operating_income: get_gross_operating_income,
    get_projected_gross_annual_rents: get_projected_gross_annual_rents,
    get_projected_annual_vacancy_costs: get_projected_annual_vacancy_costs,
    get_projected_annual_net_rental_incomes: get_projected_annual_net_rental_incomes,
    get_projected_annual_gross_operating_incomes: get_projected_annual_gross_operating_incomes,
    monthly_loan_payment: monthly_loan_payment,
    down_payment: down_payment,
    percent_to_finance: percent_to_finance,
    balance_to_finance: balance_to_finance
  };

  /* --- Private --- */

  function balance_to_finance(property) {
    var total_cost = get_total_cost(property);
    var amount_down = down_payment(property);

    return total_cost - amount_down;
  }

  function percent_to_finance(property) {
    return 100 - property.financing_and_income_assumption.equity_percentage;
  }

  function down_payment(property) {
    var equity_percentage = property.financing_and_income_assumption.equity_percentage;
    return get_total_cost(property) * equity_percentage / 100;
  }

  function monthly_loan_payment(property) {
    var principal = balance_to_finance(property);
    var interest_rate = property.financing_and_income_assumption.loan_interest_rate / 12;
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;

    var i = interest_rate / 100;
    var mortgage = principal * i * Math.pow(1 + i, num_payments) / (Math.pow(1 + i, num_payments) - 1);
    return mortgage;
  }

  function get_projected_annual_gross_operating_incomes(property) {
    var projected_nets = get_projected_annual_net_rental_incomes(property);
    var projected_others = get_projected_other_incomes(property);

    return _.map(projected_nets, function(net, index) {
      return net + projected_others[index];
    });
  }

  function get_projected_annual_net_rental_incomes(property) {
    var gross_incomes = get_projected_gross_annual_rents(property);
    var vacancy_costs = get_projected_annual_vacancy_costs(property);

    return _.map(gross_incomes, function(income, index) {
      return income - vacancy_costs[index];
    });
  }

  function get_projected_annual_vacancy_costs(property) {
    var rents = get_projected_gross_annual_rents(property);
    var vacancy_rate = property.operating_expenses_assumption.vacancy_rate / 100;

    return _.map(rents, function(rent) {
      return rent * vacancy_rate;
    })
  }

  function get_projected_gross_annual_rents(property) {
    var projected_average_monthly_rents = get_projected_average_rents(property);
    var number_of_units = property.financing_and_income_assumption.number_of_units;

    return _.map(projected_average_monthly_rents, function(rent) {
      return rent * 12 * number_of_units;
    })
  }

  function get_gross_operating_income(property) {
    var net_income = get_net_rental_income(property);
    var other_income = property.financing_and_income_assumption.other_monthly_income;
    return net_income + parseFloat(other_income)
  }

  function get_net_rental_income(property) {
    var gross_rent = get_gross_monthly_rent(property);
    var vacancy_cost = get_vacancy_operating_expense(property);
    return gross_rent - vacancy_cost;
  }

  function get_vacancy_operating_expense(property) {
    var vacancy_rate = property.operating_expenses_assumption.vacancy_rate;
    var gross_rent = get_gross_monthly_rent(property);
    return gross_rent * vacancy_rate / 100;
  }

  function get_avg_rent_per_sq_ft(property) {
    var total_area = property.financing_and_income_assumption.total_square_feet;
    var gross_rent = get_gross_monthly_rent(property);

    return gross_rent / total_area;
  }

  function get_total_cost_per_sq_ft(property) {
    var total_area = property.financing_and_income_assumption.total_square_feet;
    var total_cost = get_total_cost(property);

    return total_cost / total_area;
  }

  function get_avg_area_per_unit(property) {
    var number_of_units = property.financing_and_income_assumption.number_of_units;
    var total_area = property.financing_and_income_assumption.total_square_feet;

    return total_area / number_of_units;
  }

  function get_cost_per_unit(property) {
    var total_cost = get_total_cost(property);
    var number_of_units = property.financing_and_income_assumption.number_of_units;

    return total_cost / number_of_units;
  }

  function get_loan_origination_fee(property) {
    var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
    var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);

    return 0.01 * (land_cost + building_cost);
  }

  function get_closing_costs(property) {
    function clean_up(costs) {
      var costs_copy = angular.copy(costs);
      costs_copy.rental_property_id = 0;
      costs_copy.id = 0;
      return costs_copy;
    }

    function tally(costs) {
      var total_costs = 0;
      _.each(_.values(costs), function(cost) {
        total_costs += parseFloat(cost);
      });
      return total_costs;
    }

    return tally(clean_up(property.closing_cost));
  }

  function get_gross_monthly_rent(property) {
    var number_of_units = property.financing_and_income_assumption.number_of_units;
    var avg_rent_per_unit = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return number_of_units * avg_rent_per_unit;
  }

  function get_total_gross_monthly_income(property) {
    var other_income = parseFloat(property.financing_and_income_assumption.other_monthly_income);
    var gross_monthly_rent = get_gross_monthly_rent(property);

    return gross_monthly_rent + other_income;
  }

  function get_total_cost(property) {
    var closing_costs = get_closing_costs(property);
    var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
    var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);
    var improvements = parseFloat(property.financing_and_income_assumption.improvements);

    return closing_costs + land_cost + building_cost + improvements;
  }

  function get_projected_average_rents(property) {
    var rent_increases = property.income_and_cost_projection.rent_increases;
    var rent = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return _.map(rent_increases, function(increase) {
      var new_rent = rent * (1 + (increase / 100));
      rent = new_rent;
      return new_rent;
    });
  }

  function get_projected_other_incomes(property) {
    var rent_increases = property.income_and_cost_projection.rent_increases;
    var income = 12 * property.financing_and_income_assumption.other_monthly_income;

    return _.map(rent_increases, function(increase) {
      income = income * (1 + increase / 100);
      return income;
    });
  }
});
