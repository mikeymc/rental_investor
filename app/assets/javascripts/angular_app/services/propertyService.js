angular.module('rentals').service('propertyService', function() {
  return {
    getClosingCosts: getClosingCosts,
    getTotalGrossMonthlyIncome: getTotalGrossMonthlyIncome,
    getTotalCost: getTotalCost,
    getGrossMonthlyRent: getGrossMonthlyRent,
    getProjectedAverageRents: getProjectedAverageRents,
    getLoanOriginationFee: getLoanOriginationFee,
    getCostPerUnit: getCostPerUnit,
    getAverageAreaPerUnit: getAverageAreaPerUnit,
    getTotalCostPerSquareFoot: getTotalCostPerSquareFoot,
    getAverageRentPerSquareFoot: getAverageRentPerSquareFoot,
    getProjectedOtherIncomes: getProjectedOtherIncomes,
    getVacancyOperatingExpense: getMonthlyVacancyCosts,
    getNetRentalIncome: getNetMonthlyRentalIncome,
    getGrossOperatingIncome: getGrossOperatingIncome,
    getProjectedGrossAnnualRents: getProjectedGrossAnnualRents,
    getProjectedAnnualVacancyCosts: getProjectedAnnualVacancyCosts,
    getProjectedAnnualNetRentalIncomes: getProjectedAnnualNetRentalIncomes,
    getProjectedAnnualGrossOperatingIncomes: getProjectedAnnualGrossOperatingIncomes,
    getMonthlyLoanPayment: getMonthlyLoanPayment,
    getMonthlyInterestRate: getMonthlyInterestRate,
    getDownPayment: getDownPayment,
    getPercentToFinance: getPercentToFinance,
    getBalanceToFinance: getBalanceToFinance,
    getNetOperatingIncome: getNetOperatingIncome,
    getNetAnnualOperatingIncomes: getNetAnnualOperatingIncomes
  };

  /* --- Private --- */

  function getMonthlyInterestRate(property) {
    return property.financing_and_income_assumption.loan_interest_rate / 12;
  }

  function getNetAnnualOperatingIncomes(property, expenses) {
    var incomes = getProjectedAnnualGrossOperatingIncomes(property);
    return _.map(incomes, function(income, index) {
      return income - expenses.total.yearly_costs[index];
    });
  }

  function getNetOperatingIncome(property, expenses) {
    var grossMonthlyOperatingIncome = getGrossOperatingIncome(property);
    var totalMonthlyExpenses = expenses.total.monthly_cost;
    return grossMonthlyOperatingIncome - totalMonthlyExpenses;
  }

  function getBalanceToFinance(property) {
    var totalCost = getTotalCost(property);
    var downPayment = getDownPayment(property);

    return totalCost - downPayment;
  }

  function getPercentToFinance(property) {
    return 100 - property.financing_and_income_assumption.equity_percentage;
  }

  function getDownPayment(property) {
    var downPaymentPercentage = property.financing_and_income_assumption.equity_percentage;
    return getTotalCost(property) * downPaymentPercentage / 100;
  }

  function getMonthlyLoanPayment(property) {
    var principal = getBalanceToFinance(property);
    var loanInterestRate = property.financing_and_income_assumption.loan_interest_rate / 12;
    var numberOfLoanPayments = property.financing_and_income_assumption.amortization_period_in_years * 12;

    var i = loanInterestRate / 100;
    var monthlyLoanPayment = principal * i * Math.pow(1 + i, numberOfLoanPayments) / (Math.pow(1 + i, numberOfLoanPayments) - 1);
    return monthlyLoanPayment;
  }

  function getProjectedAnnualGrossOperatingIncomes(property) {
    var projectedAnnualNetRentalIncomes = getProjectedAnnualNetRentalIncomes(property);
    var projectedOtherIncomes = getProjectedOtherIncomes(property);

    return _.map(projectedAnnualNetRentalIncomes, function(netRentalIncomeThisYear, year) {
      return netRentalIncomeThisYear + projectedOtherIncomes[year];
    });
  }

  function getProjectedAnnualNetRentalIncomes(property) {
    var projectedGrossAnnualRents = getProjectedGrossAnnualRents(property);
    var projectedAnnualVacancyCosts = getProjectedAnnualVacancyCosts(property);

    return _.map(projectedGrossAnnualRents, function(rentsThisYear, year) {
      return rentsThisYear - projectedAnnualVacancyCosts[year];
    });
  }

  function getProjectedAnnualVacancyCosts(property) {
    var projectedGrossAnnualRents = getProjectedGrossAnnualRents(property);
    var vacancyRate = property.operating_expenses_assumption.vacancy_rate / 100;

    return _.map(projectedGrossAnnualRents, function(grossAnnualRent) {
      return grossAnnualRent * vacancyRate;
    })
  }

  function getProjectedGrossAnnualRents(property) {
    var projectedAverageMonthlyRents = getProjectedAverageRents(property);
    var numberOfUnitsInTheProperty = property.financing_and_income_assumption.number_of_units;

    return _.map(projectedAverageMonthlyRents, function(averageMonthlyRent) {
      return averageMonthlyRent * 12 * numberOfUnitsInTheProperty;
    })
  }

  function getGrossOperatingIncome(property) {
    var netMonthlyRentalIncome = getNetMonthlyRentalIncome(property);
    var otherMonthlyIncome = property.financing_and_income_assumption.other_monthly_income;
    return netMonthlyRentalIncome + parseFloat(otherMonthlyIncome)
  }

  function getNetMonthlyRentalIncome(property) {
    var grossMonthlyRent = getGrossMonthlyRent(property);
    var monthlyVacancyCosts = getMonthlyVacancyCosts(property);
    return grossMonthlyRent - monthlyVacancyCosts;
  }

  function getMonthlyVacancyCosts(property) {
    var vacancyRate = property.operating_expenses_assumption.vacancy_rate;
    var grossMonthlyRent = getGrossMonthlyRent(property);
    return grossMonthlyRent * vacancyRate / 100;
  }

  function getAverageRentPerSquareFoot(property) {
    var totalBuildingArea = property.financing_and_income_assumption.total_square_feet;
    var grossMonthlyRent = getGrossMonthlyRent(property);

    return grossMonthlyRent / totalBuildingArea;
  }

  function getTotalCostPerSquareFoot(property) {
    var totalBuildingArea = property.financing_and_income_assumption.total_square_feet;
    var totalCost = getTotalCost(property);

    return totalCost / totalBuildingArea;
  }

  function getAverageAreaPerUnit(property) {
    var numberOfUnitsInTheProperty = property.financing_and_income_assumption.number_of_units;
    var totalBuildingArea = property.financing_and_income_assumption.total_square_feet;

    return totalBuildingArea / numberOfUnitsInTheProperty;
  }

  function getCostPerUnit(property) {
    var totalCost = getTotalCost(property);
    var numberOfUnitsInTheProperty = property.financing_and_income_assumption.number_of_units;

    return totalCost / numberOfUnitsInTheProperty;
  }

  function getLoanOriginationFee(property) {
    var costOfTheLand = parseFloat(property.financing_and_income_assumption.land_cost);
    var costOfTheBuilding = parseFloat(property.financing_and_income_assumption.building_cost);

    return 0.01 * (costOfTheLand + costOfTheBuilding);
  }

  function getClosingCosts(property) {
    function cleanUp(costs) {
      var copyOfTheCosts = angular.copy(costs);
      copyOfTheCosts.rental_property_id = 0;
      copyOfTheCosts.id = 0;
      return copyOfTheCosts;
    }

    function tally(costs) {
      var totalCosts = 0;
      _.each(_.values(costs), function(cost) {
        totalCosts += parseFloat(cost);
      });
      return totalCosts;
    }

    return tally(cleanUp(property.closing_cost));
  }

  function getGrossMonthlyRent(property) {
    var numberOfUnitsInTheProperty = property.financing_and_income_assumption.number_of_units;
    var averageRentPerUnit = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return numberOfUnitsInTheProperty * averageRentPerUnit;
  }

  function getTotalGrossMonthlyIncome(property) {
    var otherMonthlyIncome = parseFloat(property.financing_and_income_assumption.other_monthly_income);
    var grossMonthlyRent = getGrossMonthlyRent(property);

    return grossMonthlyRent + otherMonthlyIncome;
  }

  function getTotalCost(property) {
    var closingCosts = getClosingCosts(property);
    var costOfTheLand = parseFloat(property.financing_and_income_assumption.land_cost);
    var costOfTheBuilding = parseFloat(property.financing_and_income_assumption.building_cost);
    var costOfImprovements = parseFloat(property.financing_and_income_assumption.improvements);

    return closingCosts + costOfTheLand + costOfTheBuilding + costOfImprovements;
  }

  function getProjectedAverageRents(property) {
    var rentIncreasesEachYear = property.income_and_cost_projection.rent_increases;
    var averageMonthlyRentPerUnit = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return _.map(rentIncreasesEachYear, function(increase) {
      var increasedRentAmount = averageMonthlyRentPerUnit * (1 + (increase / 100));
      averageMonthlyRentPerUnit = increasedRentAmount;
      return increasedRentAmount;
    });
  }

  function getProjectedOtherIncomes(property) {
    var rentIncreasesEachYear = property.income_and_cost_projection.rent_increases;
    var otherIncomeEachYear = 12 * property.financing_and_income_assumption.other_monthly_income;

    return _.map(rentIncreasesEachYear, function(increase) {
      otherIncomeEachYear = otherIncomeEachYear * (1 + increase / 100);
      return otherIncomeEachYear;
    });
  }
});
