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
});
