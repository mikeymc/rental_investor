angular.module('rentals').service('exit_scenarios_service', function(key_rent_ratios_service, noi_service, operating_expenses_service, property_service) {
  return {
    first_year_exit_price: first_year_exit_price,
    third_year_exit_price: third_year_exit_price,
    fifth_year_exit_price: fifth_year_exit_price,
    first_year_gain_on_sale: first_year_gain_on_sale,
    third_year_gain_on_sale: third_year_gain_on_sale,
    fifth_year_gain_on_sale: fifth_year_gain_on_sale
  };

  /* --- Private --- */

  function first_year_exit_price(property) {
    var cap_rate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var noi = noi_service.net_annual_incomes(property, expenses)[0];

    return noi / (0.01 * cap_rate);
  }

  function third_year_exit_price(property) {
    var cap_rate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var noi = noi_service.net_annual_incomes(property, expenses)[2];

    return noi / (0.01 * cap_rate);
  }

  function fifth_year_exit_price(property) {
    var cap_rate = key_rent_ratios_service.get_cap_rate(property);
    var expenses = operating_expenses_service.all_operating_expenses(property);
    var noi = noi_service.net_annual_incomes(property, expenses)[4];

    return noi / (0.01 * cap_rate);
  }

  function first_year_gain_on_sale(property) {
    var price = first_year_exit_price(property);
    var cost = property_service.getTotalCost(property);

    return price - cost;
  }

  function third_year_gain_on_sale(property) {
    var price = third_year_exit_price(property);
    var cost = property_service.getTotalCost(property);

    return price - cost;
  }

  function fifth_year_gain_on_sale(property) {
    var price = fifth_year_exit_price(property);
    var cost = property_service.getTotalCost(property);

    return price - cost;
  }
});
