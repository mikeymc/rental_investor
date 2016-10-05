angular.module('rentals').service('key_rent_ratios_service', function(propertyService, operating_expenses_service, noi_service) {
  return {
    get_expenses_per_unit: get_expenses_per_unit,
    get_operating_efficiency: get_operating_efficiency,
    get_cap_rate: get_cap_rate,
    get_gross_rent_multiplier: get_gross_rent_multiplier
  };

  /* --- Private --- */

  function get_expenses_per_unit(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property).total.yearly_costs[0];
    var units = property.financing_and_income_assumption.number_of_units;

    return expenses / units;
  }

  function get_operating_efficiency(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property).total.yearly_costs[0];
    var area = property.financing_and_income_assumption.total_square_feet;

    return expenses / area;
  }

  function get_cap_rate(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var noi = noi_service.net_annual_incomes(property, expenses)[0];
    var cost = propertyService.getTotalCost(property);

    return 100 * noi / cost;
  }

  function get_gross_rent_multiplier(property) {
    var first_year_rents = propertyService.getProjectedGrossAnnualRents(property)[0];
    var cost = propertyService.getTotalCost(property);

    return cost / first_year_rents;
  }
});
