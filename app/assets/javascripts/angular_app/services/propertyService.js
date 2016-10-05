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
    getVacancyOperatingExpense: getVacancyOperatingExpense,
    getNetRentalIncome: getNetRentalIncome,
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
    var gross_income = getGrossOperatingIncome(property);
    var total_monthly_expenses = expenses.total.monthly_cost;
    return gross_income - total_monthly_expenses;
  }

  function getBalanceToFinance(property) {
    var total_cost = getTotalCost(property);
    var amount_down = getDownPayment(property);

    return total_cost - amount_down;
  }

  function getPercentToFinance(property) {
    return 100 - property.financing_and_income_assumption.equity_percentage;
  }

  function getDownPayment(property) {
    var equity_percentage = property.financing_and_income_assumption.equity_percentage;
    return getTotalCost(property) * equity_percentage / 100;
  }

  function getMonthlyLoanPayment(property) {
    var principal = getBalanceToFinance(property);
    var interest_rate = property.financing_and_income_assumption.loan_interest_rate / 12;
    var num_payments = property.financing_and_income_assumption.amortization_period_in_years * 12;

    var i = interest_rate / 100;
    var mortgage = principal * i * Math.pow(1 + i, num_payments) / (Math.pow(1 + i, num_payments) - 1);
    return mortgage;
  }

  function getProjectedAnnualGrossOperatingIncomes(property) {
    var projected_nets = getProjectedAnnualNetRentalIncomes(property);
    var projected_others = getProjectedOtherIncomes(property);

    return _.map(projected_nets, function(net, index) {
      return net + projected_others[index];
    });
  }

  function getProjectedAnnualNetRentalIncomes(property) {
    var gross_incomes = getProjectedGrossAnnualRents(property);
    var vacancy_costs = getProjectedAnnualVacancyCosts(property);

    return _.map(gross_incomes, function(income, index) {
      return income - vacancy_costs[index];
    });
  }

  function getProjectedAnnualVacancyCosts(property) {
    var rents = getProjectedGrossAnnualRents(property);
    var vacancy_rate = property.operating_expenses_assumption.vacancy_rate / 100;

    return _.map(rents, function(rent) {
      return rent * vacancy_rate;
    })
  }

  function getProjectedGrossAnnualRents(property) {
    var projected_average_monthly_rents = getProjectedAverageRents(property);
    var number_of_units = property.financing_and_income_assumption.number_of_units;

    return _.map(projected_average_monthly_rents, function(rent) {
      return rent * 12 * number_of_units;
    })
  }

  function getGrossOperatingIncome(property) {
    var net_income = getNetRentalIncome(property);
    var other_income = property.financing_and_income_assumption.other_monthly_income;
    return net_income + parseFloat(other_income)
  }

  function getNetRentalIncome(property) {
    var gross_rent = getGrossMonthlyRent(property);
    var vacancy_cost = getVacancyOperatingExpense(property);
    return gross_rent - vacancy_cost;
  }

  function getVacancyOperatingExpense(property) {
    var vacancy_rate = property.operating_expenses_assumption.vacancy_rate;
    var gross_rent = getGrossMonthlyRent(property);
    return gross_rent * vacancy_rate / 100;
  }

  function getAverageRentPerSquareFoot(property) {
    var total_area = property.financing_and_income_assumption.total_square_feet;
    var gross_rent = getGrossMonthlyRent(property);

    return gross_rent / total_area;
  }

  function getTotalCostPerSquareFoot(property) {
    var total_area = property.financing_and_income_assumption.total_square_feet;
    var total_cost = getTotalCost(property);

    return total_cost / total_area;
  }

  function getAverageAreaPerUnit(property) {
    var number_of_units = property.financing_and_income_assumption.number_of_units;
    var total_area = property.financing_and_income_assumption.total_square_feet;

    return total_area / number_of_units;
  }

  function getCostPerUnit(property) {
    var total_cost = getTotalCost(property);
    var number_of_units = property.financing_and_income_assumption.number_of_units;

    return total_cost / number_of_units;
  }

  function getLoanOriginationFee(property) {
    var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
    var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);

    return 0.01 * (land_cost + building_cost);
  }

  function getClosingCosts(property) {
    function clean_up(costs) {
      var costs_copy = angular.copy(costs);
      costs_copy.rental_property_id = 0;
      costs_copy.id = 0;
      return costs_copy;
    }

    function tally(costs) {
      var total_costs = 0;
      _.each(_.values(costs), function(cost) {
        total_costs += parseFloat(cost);
      });
      return total_costs;
    }

    return tally(clean_up(property.closing_cost));
  }

  function getGrossMonthlyRent(property) {
    var number_of_units = property.financing_and_income_assumption.number_of_units;
    var avg_rent_per_unit = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return number_of_units * avg_rent_per_unit;
  }

  function getTotalGrossMonthlyIncome(property) {
    var other_income = parseFloat(property.financing_and_income_assumption.other_monthly_income);
    var gross_monthly_rent = getGrossMonthlyRent(property);

    return gross_monthly_rent + other_income;
  }

  function getTotalCost(property) {
    var closing_costs = getClosingCosts(property);
    var land_cost = parseFloat(property.financing_and_income_assumption.land_cost);
    var building_cost = parseFloat(property.financing_and_income_assumption.building_cost);
    var improvements = parseFloat(property.financing_and_income_assumption.improvements);

    return closing_costs + land_cost + building_cost + improvements;
  }

  function getProjectedAverageRents(property) {
    var rent_increases = property.income_and_cost_projection.rent_increases;
    var rent = property.financing_and_income_assumption.average_monthly_rent_per_unit;

    return _.map(rent_increases, function(increase) {
      var new_rent = rent * (1 + (increase / 100));
      rent = new_rent;
      return new_rent;
    });
  }

  function getProjectedOtherIncomes(property) {
    var rent_increases = property.income_and_cost_projection.rent_increases;
    var income = 12 * property.financing_and_income_assumption.other_monthly_income;

    return _.map(rent_increases, function(increase) {
      income = income * (1 + increase / 100);
      return income;
    });
  }
});
