angular.module('rentals').service('operating_expenses_service', function(property_service) {
  return {
    total_annual_operating_expenses_projections: total_annual_operating_expenses_projections,
    total_operating_expenses: total_operating_expenses,
    total_monthly_expenses_percentage: total_monthly_expenses_percentage,
    monthly_capex_cost: monthly_capex_cost,
    monthly_other_expenses_percentage: monthly_other_expenses_percentage,
    monthly_landscaping_fees_percentage: monthly_landscaping_fees_percentage,
    monthly_professional_fees_percentage: monthly_professional_fees_percentage,
    monthly_advertising_fees_percentage: monthly_advertising_fees_percentage,
    monthly_water_and_sewer_percentage: monthly_water_and_sewer_percentage,
    monthly_trash_removal_percentage: monthly_trash_removal_percentage,
    monthly_salaries_and_wages_percentage: monthly_salaries_and_wages_percentage,
    monthly_utilities_percentage: monthly_utilities_percentage,
    monthly_insurance_percentage: monthly_insurance_percentage,
    monthly_taxes_percentage: monthly_taxes_percentage,
    monthly_property_management_fee: monthly_property_management_fee,
    annual_property_management_fees: annual_property_management_fees,
    annual_capex_cost: annual_capex_cost,
    annual_trash_removal_costs: annual_trash_removal_costs,
    annual_landscaping_fees: annual_landscaping_fees,
    annual_taxes: annual_taxes,
    annual_advertising_fees: annual_advertising_fees,
    annual_other_operating_expenses: annual_other_operating_expenses,
    annual_water_and_sewer_costs: annual_water_and_sewer_costs,
    annual_salaries_and_wages: annual_salaries_and_wages,
    annual_professional_fees_costs: annual_professional_fees_costs,
    annual_insurance: annual_insurance,
    annual_utilities: annual_utilities,
    projected_annual_maintenance_costs: projected_annual_maintenance_costs,
    repairs_and_maintenance_percentage: repairs_and_maintenance_percentage
  };

  /* --- Private --- */

  function total_annual_operating_expenses_projections(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;

    var cost = total_operating_expenses(property) * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function total_operating_expenses(property) {
    var gross_income = property_service.get_gross_operating_income(property);
    var total_expenses_percentage = total_monthly_expenses_percentage(property);

    var number = total_expenses_percentage / 100 * gross_income;
    return number;
  }

  function total_monthly_expenses_percentage(property) {
    var percentages = [];
    percentages.push(repairs_and_maintenance_percentage(property));
    percentages.push(property.operating_expenses_assumption.property_management_fees);
    percentages.push(monthly_taxes_percentage(property));
    percentages.push(monthly_insurance_percentage(property));
    percentages.push(monthly_salaries_and_wages_percentage(property));
    percentages.push(monthly_utilities_percentage(property));
    percentages.push(monthly_water_and_sewer_percentage(property));
    percentages.push(monthly_trash_removal_percentage(property));
    percentages.push(monthly_professional_fees_percentage(property));
    percentages.push(monthly_advertising_fees_percentage(property));
    percentages.push(monthly_landscaping_fees_percentage(property));
    percentages.push(property.operating_expenses_assumption.capex);
    percentages.push(monthly_other_expenses_percentage(property));

    return _.reduce(percentages, function(memo, item) {
      return memo + parseFloat(item);
    }, 0);
  }

  function monthly_capex_cost(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_capex = property.operating_expenses_assumption.capex;

    return monthly_capex * monthly_income / 100;
  }

  function monthly_other_expenses_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_capex = property.operating_expenses_assumption.other_expenses;

    return 100 * monthly_capex / monthly_income;
  }

  function monthly_landscaping_fees_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_landscaping_fees = property.operating_expenses_assumption.landscaping;

    return 100 * monthly_landscaping_fees / monthly_income
  }

  function monthly_professional_fees_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_professional_fees = property.operating_expenses_assumption.professional_fees;

    return 100 * monthly_professional_fees / monthly_income
  }

  function monthly_advertising_fees_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_advertising_fees = property.operating_expenses_assumption.advertising;

    return 100 * monthly_advertising_fees / monthly_income
  }

  function monthly_water_and_sewer_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_water_and_sewer = property.operating_expenses_assumption.water_and_sewer;

    return 100 * monthly_water_and_sewer / monthly_income
  }

  function monthly_trash_removal_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

    return 100 * monthly_trash_removal / monthly_income
  }

  function monthly_salaries_and_wages_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_salaries_and_wages = property.operating_expenses_assumption.salaries_and_wages;

    return 100 * monthly_salaries_and_wages / monthly_income
  }

  function monthly_utilities_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_utilities = property.operating_expenses_assumption.utilities;

    return 100 * monthly_utilities / monthly_income
  }

  function monthly_insurance_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var insurance = property.operating_expenses_assumption.insurance;

    return insurance / monthly_income * 100;
  }

  function monthly_taxes_percentage(property) {
    var monthly_taxes = property.operating_expenses_assumption.taxes;
    var monthly_income = property_service.get_gross_operating_income(property);

    return monthly_taxes / monthly_income * 100;
  }

  function monthly_property_management_fee(property) {
    var gross_income = property_service.get_gross_operating_income(property);
    var property_management_fees = property.operating_expenses_assumption.property_management_fees;

    return gross_income * property_management_fees / 100;
  }

  function annual_property_management_fees(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;

    var cost = monthly_property_management_fee(property) * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_capex_cost(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;

    var cost = monthly_capex_cost(property) * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_trash_removal_costs(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

    var cost = monthly_trash_removal * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_landscaping_fees(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_landscaping = property.operating_expenses_assumption.landscaping;

    var cost = monthly_landscaping * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_taxes(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_taxes = property.operating_expenses_assumption.taxes;

    var cost = monthly_taxes * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_advertising_fees(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_advertising_fees = property.operating_expenses_assumption.advertising;

    var cost = monthly_advertising_fees * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_other_operating_expenses(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_other_expenses = property.operating_expenses_assumption.other_expenses;

    var cost = monthly_other_expenses * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_water_and_sewer_costs(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_water_and_sewer = property.operating_expenses_assumption.water_and_sewer;

    var cost = monthly_water_and_sewer * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_salaries_and_wages(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_salaries_and_wages = property.operating_expenses_assumption.salaries_and_wages;

    var cost = monthly_salaries_and_wages * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_professional_fees_costs(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_professional_fees = property.operating_expenses_assumption.professional_fees;

    var cost = monthly_professional_fees * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_insurance(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_insurance = property.operating_expenses_assumption.insurance;

    var cost = monthly_insurance * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_utilities(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_utilities = property.operating_expenses_assumption.utilities;

    var cost = monthly_utilities * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function projected_annual_maintenance_costs(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var repairs_and_maintenance_cost = property.operating_expenses_assumption.repairs_and_maintenance;

    var cost = 12 * repairs_and_maintenance_cost;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function repairs_and_maintenance_percentage(property) {
    var gross_income = property_service.get_gross_operating_income(property);
    var repairs_and_maintenance_cost = parseFloat(property.operating_expenses_assumption.repairs_and_maintenance);

    return 100 * repairs_and_maintenance_cost / gross_income;
  }

});
