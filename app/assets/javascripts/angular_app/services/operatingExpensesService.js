angular.module('rentals').service('operating_expenses_service', function(propertyService) {
  return {
    all_operating_expenses: getAllOperatingExpesnses
  };

  /* --- Private --- */

  function getAllOperatingExpesnses(property) {
    return {
      repairs_and_maintenance: {
        label: 'Repairs and Maintenance',
        percentage: getRepairsAndMaintenancePercentage(property),
        monthly_cost: property.operating_expenses_assumption.repairs_and_maintenance,
        yearly_costs: getAnnualRepairsAndMaintenanceCosts(property)
      },
      property_management: {
        label: 'Property Management Fees',
        percentage: property.operating_expenses_assumption.property_management_fees,
        monthly_cost: getMonthlyPropertyManagementFee(property),
        yearly_costs: getAnnualPropertyManagementFees(property)
      },
      taxes: {
        label: 'Taxes',
        percentage: getTaxesAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.taxes,
        yearly_costs: getAnnualTaxAmounts(property)
      },
      insurance: {
        label: 'Insurance',
        percentage: getInsuranceAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.insurance,
        yearly_costs: getAnnualInsuranceAmounts(property)
      },
      salaries_and_wages: {
        label: 'Salaries and Wages',
        percentage: getSalariesAndWagesAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.salaries_and_wages,
        yearly_costs: getAnnualSalariesAndWagesAmounts(property)
      },
      utilities: {
        label: 'Utilities',
        percentage: getUtilitiesAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.utilities,
        yearly_costs: getAnnualUtilitiesAmounts(property)
      },
      water_and_sewer: {
        label: 'Water and Sewer',
        percentage: getWaterAndSewerAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.water_and_sewer,
        yearly_costs: getAnnualWaterAndSewerAmounts(property)
      },
      trash_removal: {
        label: 'Trash Removal',
        percentage: getTrashRemovalAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.trash_removal,
        yearly_costs: getAnnualTrashRemovalAmounts(property)
      },
      professional_fees: {
        label: 'Professional Fees',
        percentage: getProfessionalFeesAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.professional_fees,
        yearly_costs: getAnnualProfessionalFeeAmounts(property)
      },
      advertising: {
        label: 'Advertising',
        percentage: getAdvertisingCostAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.advertising,
        yearly_costs: getAnnualAdvertisingCostAmounts(property)
      },
      landscaping: {
        label: 'Landscaping',
        percentage: getLandscapingCostAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.landscaping,
        yearly_costs: getAnnualLandscapingCostAmounts(property)
      },
      capex: {
        label: 'CapEx',
        percentage: property.operating_expenses_assumption.capex,
        monthly_cost: getMonthlyCapitalExpenditureAmount(property),
        yearly_costs: getAnnualCapitalExpenditureAmounts(property)
      },
      other: {
        label: 'Other',
        percentage: getOtherCostsAsPercentage(property),
        monthly_cost: property.operating_expenses_assumption.other_expenses,
        yearly_costs: getAnnualOtherCostAmounts(property)
      },
      total: {
        label: 'Total Operating Expenses',
        percentage: getTotalOperatingCostsAsPercentage(property),
        monthly_cost: getTotalMonthlyOperatingCostAmounts(property),
        yearly_costs: getTotalAnnualOperatingCostAmounts(property)
      }
    };
  }

  function getTotalAnnualOperatingCostAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;

    var cost = getTotalMonthlyOperatingCostAmounts(property) * 12;
    return _.map(operatingExpenseIncreases, function(increaseInOperatingExpensesThisYear) {
      cost = (1 + ((increaseInOperatingExpensesThisYear / 100))) * cost;
      return cost;
    });
  }

  function getTotalMonthlyOperatingCostAmounts(property) {
    var grossOperatingIncomeEachMonth = propertyService.getGrossOperatingIncome(property);
    var totalOperatingCostsAsPercentage = getTotalOperatingCostsAsPercentage(property);

    var number = totalOperatingCostsAsPercentage / 100 * grossOperatingIncomeEachMonth;
    return number;
  }

  function getTotalOperatingCostsAsPercentage(property) {
    var percentages = [];
    percentages.push(getRepairsAndMaintenancePercentage(property));
    percentages.push(property.operating_expenses_assumption.property_management_fees);
    percentages.push(getTaxesAsPercentage(property));
    percentages.push(getInsuranceAsPercentage(property));
    percentages.push(getSalariesAndWagesAsPercentage(property));
    percentages.push(getUtilitiesAsPercentage(property));
    percentages.push(getWaterAndSewerAsPercentage(property));
    percentages.push(getTrashRemovalAsPercentage(property));
    percentages.push(getProfessionalFeesAsPercentage(property));
    percentages.push(getAdvertisingCostAsPercentage(property));
    percentages.push(getLandscapingCostAsPercentage(property));
    percentages.push(property.operating_expenses_assumption.capex);
    percentages.push(getOtherCostsAsPercentage(property));

    return _.reduce(percentages, function(memo, item) {
      return memo + parseFloat(item);
    }, 0);
  }

  function getMonthlyCapitalExpenditureAmount(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyCapitalExpenditure = property.operating_expenses_assumption.capex;

    return monthlyCapitalExpenditure * grossMonthlyOperatingIncome / 100;
  }

  function getOtherCostsAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyCapitalExpenditure = property.operating_expenses_assumption.other_expenses;

    return 100 * monthlyCapitalExpenditure / grossMonthlyOperatingIncome;
  }

  function getLandscapingCostAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyLandscapingFees = property.operating_expenses_assumption.landscaping;

    return 100 * monthlyLandscapingFees / grossMonthlyOperatingIncome
  }

  function getProfessionalFeesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyProfessionalFees = property.operating_expenses_assumption.professional_fees;

    return 100 * monthlyProfessionalFees / grossMonthlyOperatingIncome
  }

  function getAdvertisingCostAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyAdvertisingFees = property.operating_expenses_assumption.advertising;

    return 100 * monthlyAdvertisingFees / grossMonthlyOperatingIncome
  }

  function getWaterAndSewerAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyWaterAndSewerCosts = property.operating_expenses_assumption.water_and_sewer;

    return 100 * monthlyWaterAndSewerCosts / grossMonthlyOperatingIncome
  }

  function getTrashRemovalAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

    return 100 * monthly_trash_removal / grossMonthlyOperatingIncome
  }

  function getSalariesAndWagesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlySalariesAndWages = property.operating_expenses_assumption.salaries_and_wages;

    return 100 * monthlySalariesAndWages / grossMonthlyOperatingIncome
  }

  function getUtilitiesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyUtilities = property.operating_expenses_assumption.utilities;

    return 100 * monthlyUtilities / grossMonthlyOperatingIncome
  }

  function getInsuranceAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var insurance = property.operating_expenses_assumption.insurance;

    return insurance / grossMonthlyOperatingIncome * 100;
  }

  function getTaxesAsPercentage(property) {
    var monthlyTaxes = property.operating_expenses_assumption.taxes;
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);

    return monthlyTaxes / grossMonthlyOperatingIncome * 100;
  }

  function getMonthlyPropertyManagementFee(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var propertyManagementFees = property.operating_expenses_assumption.property_management_fees;

    return grossMonthlyOperatingIncome * propertyManagementFees / 100;
  }

  function getAnnualPropertyManagementFees(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyPropertyManagementFee = getMonthlyPropertyManagementFee(property) * 12;

    return _.map(operatingExpenseIncreases, function(increase) {
      monthlyPropertyManagementFee = (1 + ((increase / 100))) * monthlyPropertyManagementFee;
      return monthlyPropertyManagementFee;
    });
  }

  function getAnnualCapitalExpenditureAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;

    var monthlyCapitalExpenditureAmount = getMonthlyCapitalExpenditureAmount(property) * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      monthlyCapitalExpenditureAmount = (1 + ((increase / 100))) * monthlyCapitalExpenditureAmount;
      return monthlyCapitalExpenditureAmount;
    });
  }

  function getAnnualTrashRemovalAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyTrashRemovalCost = property.operating_expenses_assumption.trash_removal;

    var annualTrashRemovalCost = monthlyTrashRemovalCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualTrashRemovalCost = (1 + ((increase / 100))) * annualTrashRemovalCost;
      return annualTrashRemovalCost;
    });
  }

  function getAnnualLandscapingCostAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyLandscapingCosts = property.operating_expenses_assumption.landscaping;

    var landscapingCostsForTheYear = monthlyLandscapingCosts * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      landscapingCostsForTheYear = (1 + ((increase / 100))) * landscapingCostsForTheYear;
      return landscapingCostsForTheYear;
    });
  }

  function getAnnualTaxAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyTaxAmount = property.operating_expenses_assumption.taxes;

    var annualTaxCost = monthlyTaxAmount * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualTaxCost = (1 + ((increase / 100))) * annualTaxCost;
      return annualTaxCost;
    });
  }

  function getAnnualAdvertisingCostAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyAdvertisingFees = property.operating_expenses_assumption.advertising;

    var annualAdvertisingFees = monthlyAdvertisingFees * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualAdvertisingFees = (1 + ((increase / 100))) * annualAdvertisingFees;
      return annualAdvertisingFees;
    });
  }

  function getAnnualOtherCostAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyOtherExpenses = property.operating_expenses_assumption.other_expenses;

    var annualOtherExpenses = monthlyOtherExpenses * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualOtherExpenses = (1 + ((increase / 100))) * annualOtherExpenses;
      return annualOtherExpenses;
    });
  }

  function getAnnualWaterAndSewerAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyWaterAndSewerCost = property.operating_expenses_assumption.water_and_sewer;

    var annualWaterAndSewerCost = monthlyWaterAndSewerCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualWaterAndSewerCost = (1 + ((increase / 100))) * annualWaterAndSewerCost;
      return annualWaterAndSewerCost;
    });
  }

  function getAnnualSalariesAndWagesAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlySalariesAndWages = property.operating_expenses_assumption.salaries_and_wages;

    var annualSalariesAndWages = monthlySalariesAndWages * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualSalariesAndWages = (1 + ((increase / 100))) * annualSalariesAndWages;
      return annualSalariesAndWages;
    });
  }

  function getAnnualProfessionalFeeAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyProfessionalFees = property.operating_expenses_assumption.professional_fees;

    var annualProfessionalFees = monthlyProfessionalFees * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualProfessionalFees = (1 + ((increase / 100))) * annualProfessionalFees;
      return annualProfessionalFees;
    });
  }

  function getAnnualInsuranceAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyInsuranceCost = property.operating_expenses_assumption.insurance;

    var annualInsuranceCost = monthlyInsuranceCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualInsuranceCost = (1 + ((increase / 100))) * annualInsuranceCost;
      return annualInsuranceCost;
    });
  }

  function getAnnualUtilitiesAmounts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyUtilitiesCost = property.operating_expenses_assumption.utilities;

    var annualUtilitiesCost = monthlyUtilitiesCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualUtilitiesCost = (1 + ((increase / 100))) * annualUtilitiesCost;
      return annualUtilitiesCost;
    });
  }

  function getAnnualRepairsAndMaintenanceCosts(property) {
    var operatingExpenseIncreases = property.income_and_cost_projection.operating_expense_increases;
    var monthlyRepairsAndMaintenanceExpense = property.operating_expenses_assumption.repairs_and_maintenance;

    var annualRepairsAndMaintenanceExpense = 12 * monthlyRepairsAndMaintenanceExpense;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualRepairsAndMaintenanceExpense = (1 + ((increase / 100))) * annualRepairsAndMaintenanceExpense;
      return annualRepairsAndMaintenanceExpense;
    });
  }

  function getRepairsAndMaintenancePercentage(property) {
    var monthlyGrossOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyRepairsAndMaintenanceCost = parseFloat(property.operating_expenses_assumption.repairs_and_maintenance);

    return 100 * monthlyRepairsAndMaintenanceCost / monthlyGrossOperatingIncome;
  }
});
