angular.module('rentals').service('exit_scenarios_service', function(key_rent_ratios_service, noi_service, operating_expenses_service, propertyService) {
  return {
    first_year_exit_price: firstYearExitPrice,
    third_year_exit_price: thirdYearExitPrice,
    fifth_year_exit_price: fifthYearExitPrice,
    first_year_gain_on_sale: firstYearGainOnSale,
    third_year_gain_on_sale: thirdYearGainOnSale,
    fifth_year_gain_on_sale: fifthYearGainOnSale
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
