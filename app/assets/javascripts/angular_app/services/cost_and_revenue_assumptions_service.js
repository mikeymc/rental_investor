angular.module('rentals').service('cost_and_revenue_assumptions_service', function() {
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
    get_avg_rent_per_sq_ft: get_avg_rent_per_sq_ft
  };

  /* --- Private --- */

  function get_avg_rent_per_sq_ft(property) {
    var assumptions = property.financing_and_income_assumption;
    var gross_rent = get_gross_monthly_rent(property);
    return gross_rent / assumptions.total_square_feet;
  }

  function get_total_cost_per_sq_ft(property) {
    var assumptions = property.financing_and_income_assumption;
    var total_cost = get_total_cost(property);
    return total_cost / assumptions.total_square_feet;
  }

  function get_avg_area_per_unit(property) {
    var assumptions = property.financing_and_income_assumption;
    return assumptions.total_square_feet / assumptions.number_of_units;
  }

  function get_cost_per_unit(property) {
    var total_cost = get_total_cost(property);
    return total_cost / property.financing_and_income_assumption.number_of_units;
  }

  function get_loan_origination_fee(property) {
    var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
    var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);

    return 0.01 * (land_cost + building_cost);
  }

  function get_closing_costs(property) {
    if(!property) {
      return 0;
    }

    var costs_copy = angular.copy(property.closing_cost);
    costs_copy.id = 0;
    costs_copy.rental_property_id = 0;

    var total_costs = 0;
    _.each(_.values(costs_copy), function(cost) {
      total_costs += parseFloat(cost);
    });
    return total_costs;
  }

  function get_gross_monthly_rent(property) {
    var assumptions = property.financing_and_income_assumption;
    return assumptions.number_of_units * assumptions.average_monthly_rent_per_unit;
  }

  function get_total_gross_monthly_income(property) {
    var assumptions = property.financing_and_income_assumption;
    var gross_monthly_rent = get_gross_monthly_rent(property);
    return parseFloat(gross_monthly_rent) +
      parseFloat(assumptions.other_monthly_income);
  }

  function get_total_cost(property) {
    var financing_and_income_assumptions = property.financing_and_income_assumption;
    var closing_costs = get_closing_costs(property);

    return parseFloat(closing_costs) +
      parseFloat(financing_and_income_assumptions.land_cost) +
      parseFloat(financing_and_income_assumptions.building_cost) +
      parseFloat(financing_and_income_assumptions.improvements);
  }

  function get_projected_average_rents(property) {
    var rent_increases = property.income_and_cost_projection.rent_increases;
    var rent = property.financing_and_income_assumption.average_monthly_rent_per_unit;
    var average_rents = [];
    _.each(rent_increases, function(increase) {
      var new_rent = rent * (1 + (increase / 100));
      rent = new_rent;
      average_rents.push(new_rent);
    });
    return average_rents;
  }
});
