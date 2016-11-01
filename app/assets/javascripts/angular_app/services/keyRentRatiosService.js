angular.module('rentals').service('keyRentRatiosService', function(propertyService, operatingExpensesService, noiService) {
  return {
    getExpensesPerUnit: getExpensesPerUnit,
    getOperatingEfficiency: getOperatingEfficiency,
    getCapitalizationRate: getCapitalizationRate,
    getGrossRentMultiplier: getGrossRentMultiplier
  };

  /* --- Private --- */

  function getExpensesPerUnit(property) {
    var expenses = operatingExpensesService.getAllOperatingExpenses(property).total.yearlyCosts[0];
    var units = property.financingAndIncomeAssumption.numberOfUnits;

    return expenses / units;
  }

  function getOperatingEfficiency(property) {
    var expenses = operatingExpensesService.getAllOperatingExpenses(property).total.yearlyCosts[0];
    var area = property.financingAndIncomeAssumption.totalSquareFeet;

    return expenses / area;
  }

  function getCapitalizationRate(property) {
    var expenses = operatingExpensesService.getAllOperatingExpenses(property);
    var netOperatingIncome = noiService.getNetAnnualIncomes(property, expenses)[0];
    var cost = propertyService.getTotalCost(property);

    return 100 * netOperatingIncome / cost;
  }

  function getGrossRentMultiplier(property) {
    var firstYearRents = propertyService.getProjectedGrossAnnualRents(property)[0];
    var cost = propertyService.getTotalCost(property);

    return cost / firstYearRents;
  }
});
