angular.module('rentals').service('exitScenariosService', function(key_rent_ratios_service, noi_service, operating_expenses_service, propertyService) {
  return {
    firstYearExitPrice: firstYearExitPrice,
    thirdYearExitPrice: thirdYearExitPrice,
    fifthYearExitPrice: fifthYearExitPrice,
    firstYearGainOnSale: firstYearGainOnSale,
    thirdYearGainOnSale: thirdYearGainOnSale,
    fifthYearGainOnSale: fifthYearGainOnSale
  };

  /* --- Private --- */

  function firstYearExitPrice(property) {
    var capRate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var netOperatingIncome = noi_service.net_annual_incomes(property, expenses)[0];

    return netOperatingIncome / (0.01 * capRate);
  }

  function thirdYearExitPrice(property) {
    var capRate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var netOperatingIncome = noi_service.net_annual_incomes(property, expenses)[2];

    return netOperatingIncome / (0.01 * capRate);
  }

  function fifthYearExitPrice(property) {
    var capRate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var netOperatingIncome = noi_service.net_annual_incomes(property, expenses)[4];

    return netOperatingIncome / (0.01 * capRate);
  }

  function firstYearGainOnSale(property) {
    var exitPrice = firstYearExitPrice(property);
    var initialCost = propertyService.getTotalCost(property);

    return exitPrice - initialCost;
  }

  function thirdYearGainOnSale(property) {
    var exitPrice = thirdYearExitPrice(property);
    var initialCost = propertyService.getTotalCost(property);

    return exitPrice - initialCost;
  }

  function fifthYearGainOnSale(property) {
    var exitPrice = fifthYearExitPrice(property);
    var initialCost = propertyService.getTotalCost(property);

    return exitPrice - initialCost;
  }
});
