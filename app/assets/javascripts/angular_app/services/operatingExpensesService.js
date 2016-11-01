angular.module('rentals').service('operatingExpensesService', function(propertyService) {
  return {
    getAllOperatingExpenses: getAllOperatingExpenses
  };

  /* --- Private --- */

  function getAllOperatingExpenses(property) {
    return {
      repairs_and_maintenance: {
        label: 'Repairs and Maintenance',
        percentage: getRepairsAndMaintenancePercentage(property),
        monthlyCost: property.operatingExpensesAssumption.repairsAndMaintenance,
        yearlyCosts: getAnnualRepairsAndMaintenanceCosts(property)
      },
      property_management: {
        label: 'Property Management Fees',
        percentage: property.operatingExpensesAssumption.propertyManagementFees,
        monthlyCost: getMonthlyPropertyManagementFee(property),
        yearlyCosts: getAnnualPropertyManagementFees(property)
      },
      taxes: {
        label: 'Taxes',
        percentage: getTaxesAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.taxes,
        yearlyCosts: getAnnualTaxAmounts(property)
      },
      insurance: {
        label: 'Insurance',
        percentage: getInsuranceAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.insurance,
        yearlyCosts: getAnnualInsuranceAmounts(property)
      },
      salaries_and_wages: {
        label: 'Salaries and Wages',
        percentage: getSalariesAndWagesAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.salariesAndWages,
        yearlyCosts: getAnnualSalariesAndWagesAmounts(property)
      },
      utilities: {
        label: 'Utilities',
        percentage: getUtilitiesAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.utilities,
        yearlyCosts: getAnnualUtilitiesAmounts(property)
      },
      water_and_sewer: {
        label: 'Water and Sewer',
        percentage: getWaterAndSewerAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.waterAndSewer,
        yearlyCosts: getAnnualWaterAndSewerAmounts(property)
      },
      trash_removal: {
        label: 'Trash Removal',
        percentage: getTrashRemovalAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.trashRemoval,
        yearlyCosts: getAnnualTrashRemovalAmounts(property)
      },
      professional_fees: {
        label: 'Professional Fees',
        percentage: getProfessionalFeesAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.professionalFees,
        yearlyCosts: getAnnualProfessionalFeeAmounts(property)
      },
      advertising: {
        label: 'Advertising',
        percentage: getAdvertisingCostAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.advertising,
        yearlyCosts: getAnnualAdvertisingCostAmounts(property)
      },
      landscaping: {
        label: 'Landscaping',
        percentage: getLandscapingCostAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.landscaping,
        yearlyCosts: getAnnualLandscapingCostAmounts(property)
      },
      capex: {
        label: 'CapEx',
        percentage: property.operatingExpensesAssumption.capex,
        monthlyCost: getMonthlyCapitalExpenditureAmount(property),
        yearlyCosts: getAnnualCapitalExpenditureAmounts(property)
      },
      other: {
        label: 'Other',
        percentage: getOtherCostsAsPercentage(property),
        monthlyCost: property.operatingExpensesAssumption.otherExpenses,
        yearlyCosts: getAnnualOtherCostAmounts(property)
      },
      total: {
        label: 'Total Operating Expenses',
        percentage: getTotalOperatingCostsAsPercentage(property),
        monthlyCost: getTotalMonthlyOperatingCostAmounts(property),
        yearlyCosts: getTotalAnnualOperatingCostAmounts(property)
      }
    };
  }

  function getTotalAnnualOperatingCostAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;

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
    percentages.push(property.operatingExpensesAssumption.propertyManagementFees);
    percentages.push(getTaxesAsPercentage(property));
    percentages.push(getInsuranceAsPercentage(property));
    percentages.push(getSalariesAndWagesAsPercentage(property));
    percentages.push(getUtilitiesAsPercentage(property));
    percentages.push(getWaterAndSewerAsPercentage(property));
    percentages.push(getTrashRemovalAsPercentage(property));
    percentages.push(getProfessionalFeesAsPercentage(property));
    percentages.push(getAdvertisingCostAsPercentage(property));
    percentages.push(getLandscapingCostAsPercentage(property));
    percentages.push(property.operatingExpensesAssumption.capex);
    percentages.push(getOtherCostsAsPercentage(property));

    return _.reduce(percentages, function(memo, item) {
      return memo + parseFloat(item);
    }, 0);
  }

  function getMonthlyCapitalExpenditureAmount(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyCapitalExpenditure = property.operatingExpensesAssumption.capex;

    return monthlyCapitalExpenditure * grossMonthlyOperatingIncome / 100;
  }

  function getOtherCostsAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyCapitalExpenditure = property.operatingExpensesAssumption.otherExpenses;

    return 100 * monthlyCapitalExpenditure / grossMonthlyOperatingIncome;
  }

  function getLandscapingCostAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyLandscapingFees = property.operatingExpensesAssumption.landscaping;

    return 100 * monthlyLandscapingFees / grossMonthlyOperatingIncome
  }

  function getProfessionalFeesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyProfessionalFees = property.operatingExpensesAssumption.professionalFees;

    return 100 * monthlyProfessionalFees / grossMonthlyOperatingIncome
  }

  function getAdvertisingCostAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyAdvertisingFees = property.operatingExpensesAssumption.advertising;

    return 100 * monthlyAdvertisingFees / grossMonthlyOperatingIncome
  }

  function getWaterAndSewerAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyWaterAndSewerCosts = property.operatingExpensesAssumption.waterAndSewer;

    return 100 * monthlyWaterAndSewerCosts / grossMonthlyOperatingIncome
  }

  function getTrashRemovalAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthly_trash_removal = property.operatingExpensesAssumption.trashRemoval;

    return 100 * monthly_trash_removal / grossMonthlyOperatingIncome
  }

  function getSalariesAndWagesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlySalariesAndWages = property.operatingExpensesAssumption.salariesAndWages;

    return 100 * monthlySalariesAndWages / grossMonthlyOperatingIncome
  }

  function getUtilitiesAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyUtilities = property.operatingExpensesAssumption.utilities;

    return 100 * monthlyUtilities / grossMonthlyOperatingIncome
  }

  function getInsuranceAsPercentage(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var insurance = property.operatingExpensesAssumption.insurance;

    return insurance / grossMonthlyOperatingIncome * 100;
  }

  function getTaxesAsPercentage(property) {
    var monthlyTaxes = property.operatingExpensesAssumption.taxes;
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);

    return monthlyTaxes / grossMonthlyOperatingIncome * 100;
  }

  function getMonthlyPropertyManagementFee(property) {
    var grossMonthlyOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var propertyManagementFees = property.operatingExpensesAssumption.propertyManagementFees;

    return grossMonthlyOperatingIncome * propertyManagementFees / 100;
  }

  function getAnnualPropertyManagementFees(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyPropertyManagementFee = getMonthlyPropertyManagementFee(property) * 12;

    return _.map(operatingExpenseIncreases, function(increase) {
      monthlyPropertyManagementFee = (1 + ((increase / 100))) * monthlyPropertyManagementFee;
      return monthlyPropertyManagementFee;
    });
  }

  function getAnnualCapitalExpenditureAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;

    var monthlyCapitalExpenditureAmount = getMonthlyCapitalExpenditureAmount(property) * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      monthlyCapitalExpenditureAmount = (1 + ((increase / 100))) * monthlyCapitalExpenditureAmount;
      return monthlyCapitalExpenditureAmount;
    });
  }

  function getAnnualTrashRemovalAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyTrashRemovalCost = property.operatingExpensesAssumption.trashRemoval;

    var annualTrashRemovalCost = monthlyTrashRemovalCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualTrashRemovalCost = (1 + ((increase / 100))) * annualTrashRemovalCost;
      return annualTrashRemovalCost;
    });
  }

  function getAnnualLandscapingCostAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyLandscapingCosts = property.operatingExpensesAssumption.landscaping;

    var landscapingCostsForTheYear = monthlyLandscapingCosts * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      landscapingCostsForTheYear = (1 + ((increase / 100))) * landscapingCostsForTheYear;
      return landscapingCostsForTheYear;
    });
  }

  function getAnnualTaxAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyTaxAmount = property.operatingExpensesAssumption.taxes;

    var annualTaxCost = monthlyTaxAmount * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualTaxCost = (1 + ((increase / 100))) * annualTaxCost;
      return annualTaxCost;
    });
  }

  function getAnnualAdvertisingCostAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyAdvertisingFees = property.operatingExpensesAssumption.advertising;

    var annualAdvertisingFees = monthlyAdvertisingFees * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualAdvertisingFees = (1 + ((increase / 100))) * annualAdvertisingFees;
      return annualAdvertisingFees;
    });
  }

  function getAnnualOtherCostAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyOtherExpenses = property.operatingExpensesAssumption.otherExpenses;

    var annualOtherExpenses = monthlyOtherExpenses * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualOtherExpenses = (1 + ((increase / 100))) * annualOtherExpenses;
      return annualOtherExpenses;
    });
  }

  function getAnnualWaterAndSewerAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyWaterAndSewerCost = property.operatingExpensesAssumption.waterAndSewer;

    var annualWaterAndSewerCost = monthlyWaterAndSewerCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualWaterAndSewerCost = (1 + ((increase / 100))) * annualWaterAndSewerCost;
      return annualWaterAndSewerCost;
    });
  }

  function getAnnualSalariesAndWagesAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlySalariesAndWages = property.operatingExpensesAssumption.salariesAndWages;

    var annualSalariesAndWages = monthlySalariesAndWages * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualSalariesAndWages = (1 + ((increase / 100))) * annualSalariesAndWages;
      return annualSalariesAndWages;
    });
  }

  function getAnnualProfessionalFeeAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyProfessionalFees = property.operatingExpensesAssumption.professionalFees;

    var annualProfessionalFees = monthlyProfessionalFees * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualProfessionalFees = (1 + ((increase / 100))) * annualProfessionalFees;
      return annualProfessionalFees;
    });
  }

  function getAnnualInsuranceAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyInsuranceCost = property.operatingExpensesAssumption.insurance;

    var annualInsuranceCost = monthlyInsuranceCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualInsuranceCost = (1 + ((increase / 100))) * annualInsuranceCost;
      return annualInsuranceCost;
    });
  }

  function getAnnualUtilitiesAmounts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyUtilitiesCost = property.operatingExpensesAssumption.utilities;

    var annualUtilitiesCost = monthlyUtilitiesCost * 12;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualUtilitiesCost = (1 + ((increase / 100))) * annualUtilitiesCost;
      return annualUtilitiesCost;
    });
  }

  function getAnnualRepairsAndMaintenanceCosts(property) {
    var operatingExpenseIncreases = property.incomeAndCostProjection.operatingExpenseIncreases;
    var monthlyRepairsAndMaintenanceExpense = property.operatingExpensesAssumption.repairsAndMaintenance;

    var annualRepairsAndMaintenanceExpense = 12 * monthlyRepairsAndMaintenanceExpense;
    return _.map(operatingExpenseIncreases, function(increase) {
      annualRepairsAndMaintenanceExpense = (1 + ((increase / 100))) * annualRepairsAndMaintenanceExpense;
      return annualRepairsAndMaintenanceExpense;
    });
  }

  function getRepairsAndMaintenancePercentage(property) {
    var monthlyGrossOperatingIncome = propertyService.getGrossOperatingIncome(property);
    var monthlyRepairsAndMaintenanceCost = parseFloat(property.operatingExpensesAssumption.repairsAndMaintenance);

    return 100 * monthlyRepairsAndMaintenanceCost / monthlyGrossOperatingIncome;
  }
});
