angular.module('rentals').service('keyRentRatiosService', function(propertyService, operating_expenses_service, noiService) {
  return {
    getExpensesPerUnit: getExpensesPerUnit,
    getOperatingEfficiency: getOperatingEfficiency,
    getCapitalizationRate: getCapitalizationRate,
    getGrossRentMultiplier: getGrossRentMultiplier
  };

  /* --- Private --- */

  function getExpensesPerUnit(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property).total.yearly_costs[0];
    var units = property.financing_and_income_assumption.number_of_units;

    return expenses / units;
  }

  function getOperatingEfficiency(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property).total.yearly_costs[0];
    var area = property.financing_and_income_assumption.total_square_feet;

    return expenses / area;
  }

  function getCapitalizationRate(property) {
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var netOperatingIncome = noiService.net_annual_incomes(property, expenses)[0];
    var cost = propertyService.getTotalCost(property);

    return 100 * netOperatingIncome / cost;
  }

  function getGrossRentMultiplier(property) {
    var firstYearRents = propertyService.getProjectedGrossAnnualRents(property)[0];
    var cost = propertyService.getTotalCost(property);

    return cost / firstYearRents;
  }
});
