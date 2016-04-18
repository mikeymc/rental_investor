angular.module('rentals').service('cost_and_revenue_assumptions_service', function() {
  return {
    get_closing_costs: get_closing_costs,
    get_total_gross_monthly_income: get_total_gross_monthly_income,
    get_total_cost: get_total_cost,
    get_gross_monthly_rent: get_gross_monthly_rent
  };

  function get_closing_costs(individual_costs) {
    if(!individual_costs) {
      return 0;
    }

    var costs_copy = angular.copy(individual_costs);
    costs_copy.id = 0;
    costs_copy.rental_property_id = 0;

    var total_costs = 0;
    _.each(_.values(costs_copy), function(cost) {
      total_costs += parseFloat(cost);
    });
    return total_costs;
  }

  function get_gross_monthly_rent(assumptions) {
    return assumptions.number_of_units * assumptions.average_monthly_rent_per_unit;
  }

  function get_total_gross_monthly_income(gross_monthly_rent, assumptions) {
    return parseFloat(gross_monthly_rent) +
      parseFloat(assumptions.other_monthly_income);
  }

  function get_total_cost(closing_costs, financing_and_income_assumptions) {
    return parseFloat(closing_costs) +
      parseFloat(financing_and_income_assumptions.land_cost) +
      parseFloat(financing_and_income_assumptions.building_cost) +
      parseFloat(financing_and_income_assumptions.improvements);
  }
});
