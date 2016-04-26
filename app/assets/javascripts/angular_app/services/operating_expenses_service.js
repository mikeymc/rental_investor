angular.module('rentals').service('operating_expenses_service', function(property_service) {
  return {
    all_operating_expenses: all_operating_expenses
  };

  /* --- Private --- */

  function all_operating_expenses(property) {
    return [
      {
        label: 'Repairs and Maintenance',
        percentage: repairs_and_maintenance_percentage(property),
        monthly_cost: property.operating_expenses_assumption.repairs_and_maintenance,
        yearly_costs: annual_repairs_and_maintenance(property)
      },
      {
        label: 'Property Management Fees',
        percentage: property.operating_expenses_assumption.property_management_fees,
        monthly_cost: monthly_property_management_fee(property),
        yearly_costs: annual_property_management_fees(property)
      },
      {
        label: 'Taxes',
        percentage: taxes_percentage(property),
        monthly_cost: property.operating_expenses_assumption.taxes,
        yearly_costs: annual_taxes(property)
      },
      {
        label: 'Insurance',
        percentage: insurance_percentage(property),
        monthly_cost: property.operating_expenses_assumption.insurance,
        yearly_costs: annual_insurance(property)
      },
      {
        label: 'Salaries and Wages',
        percentage: salaries_and_wages_percentage(property),
        monthly_cost: property.operating_expenses_assumption.salaries_and_wages,
        yearly_costs: annual_salaries_and_wages(property)
      },
      {
        label: 'Utilities',
        percentage: utilities_percentage(property),
        monthly_cost: property.operating_expenses_assumption.utilities,
        yearly_costs: annual_utilities(property)
      },
      {
        label: 'Water and Sewer',
        percentage: water_and_sewer_percentage(property),
        monthly_cost: property.operating_expenses_assumption.water_and_sewer,
        yearly_costs: annual_water_and_sewer(property)
      },
      {
        label: 'Trash Removal',
        percentage: trash_removal_percentage(property),
        monthly_cost: property.operating_expenses_assumption.trash_removal,
        yearly_costs: annual_trash_removal(property)
      },
      {
        label: 'Professional Fees',
        percentage: professional_fees_percentage(property),
        monthly_cost: property.operating_expenses_assumption.professional_fees,
        yearly_costs: annual_professional_fees(property)
      },
      {
        label: 'Advertising',
        percentage: advertising_percentage(property),
        monthly_cost: property.operating_expenses_assumption.advertising,
        yearly_costs: annual_advertising(property)
      },
      {
        label: 'Landscaping',
        percentage: landscaping_percentage(property),
        monthly_cost: property.operating_expenses_assumption.landscaping,
        yearly_costs: annual_landscaping(property)
      },
      {
        label: 'CapEx',
        percentage: property.operating_expenses_assumption.capex,
        monthly_cost: monthly_capex(property),
        yearly_costs: annual_capex(property)
      },
      {
        label: 'Other',
        percentage: other_percentage(property),
        monthly_cost: property.operating_expenses_assumption.other_expenses,
        yearly_costs: annual_other(property)
      },
      {
        label: 'Total Operating Expenses',
        percentage: total_percentage(property),
        monthly_cost: total_monthly(property),
        yearly_costs: total_annual(property)
      }
    ];
  }

  function total_annual(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;

    var cost = total_monthly(property) * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function total_monthly(property) {
    var gross_income = property_service.get_gross_operating_income(property);
    var total_expenses_percentage = total_percentage(property);

    var number = total_expenses_percentage / 100 * gross_income;
    return number;
  }

  function total_percentage(property) {
    var percentages = [];
    percentages.push(repairs_and_maintenance_percentage(property));
    percentages.push(property.operating_expenses_assumption.property_management_fees);
    percentages.push(taxes_percentage(property));
    percentages.push(insurance_percentage(property));
    percentages.push(salaries_and_wages_percentage(property));
    percentages.push(utilities_percentage(property));
    percentages.push(water_and_sewer_percentage(property));
    percentages.push(trash_removal_percentage(property));
    percentages.push(professional_fees_percentage(property));
    percentages.push(advertising_percentage(property));
    percentages.push(landscaping_percentage(property));
    percentages.push(property.operating_expenses_assumption.capex);
    percentages.push(other_percentage(property));

    return _.reduce(percentages, function(memo, item) {
      return memo + parseFloat(item);
    }, 0);
  }

  function monthly_capex(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_capex = property.operating_expenses_assumption.capex;

    return monthly_capex * monthly_income / 100;
  }

  function other_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_capex = property.operating_expenses_assumption.other_expenses;

    return 100 * monthly_capex / monthly_income;
  }

  function landscaping_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_landscaping_fees = property.operating_expenses_assumption.landscaping;

    return 100 * monthly_landscaping_fees / monthly_income
  }

  function professional_fees_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_professional_fees = property.operating_expenses_assumption.professional_fees;

    return 100 * monthly_professional_fees / monthly_income
  }

  function advertising_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_advertising_fees = property.operating_expenses_assumption.advertising;

    return 100 * monthly_advertising_fees / monthly_income
  }

  function water_and_sewer_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_water_and_sewer = property.operating_expenses_assumption.water_and_sewer;

    return 100 * monthly_water_and_sewer / monthly_income
  }

  function trash_removal_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

    return 100 * monthly_trash_removal / monthly_income
  }

  function salaries_and_wages_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_salaries_and_wages = property.operating_expenses_assumption.salaries_and_wages;

    return 100 * monthly_salaries_and_wages / monthly_income
  }

  function utilities_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var monthly_utilities = property.operating_expenses_assumption.utilities;

    return 100 * monthly_utilities / monthly_income
  }

  function insurance_percentage(property) {
    var monthly_income = property_service.get_gross_operating_income(property);
    var insurance = property.operating_expenses_assumption.insurance;

    return insurance / monthly_income * 100;
  }

  function taxes_percentage(property) {
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

  function annual_capex(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;

    var cost = monthly_capex(property) * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_trash_removal(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

    var cost = monthly_trash_removal * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_landscaping(property) {
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

  function annual_advertising(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_advertising_fees = property.operating_expenses_assumption.advertising;

    var cost = monthly_advertising_fees * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_other(property) {
    var expense_increases = property.income_and_cost_projection.operating_expense_increases;
    var monthly_other_expenses = property.operating_expenses_assumption.other_expenses;

    var cost = monthly_other_expenses * 12;
    return _.map(expense_increases, function(increase) {
      cost = (1 + ((increase / 100))) * cost;
      return cost;
    });
  }

  function annual_water_and_sewer(property) {
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

  function annual_professional_fees(property) {
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

  function annual_repairs_and_maintenance(property) {
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
