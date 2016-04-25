angular.module('rentals').directive('operatingExpenses', function(property_service, $filter) {
  return {
    templateUrl: 'investment_properties_pages/operating_expenses.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.repairs_and_maintenance_percentage = repairs_and_maintenance_percentage($scope.rental_property);
        $scope.projected_annual_maintenance_costs = projected_annual_maintenance_costs($scope.rental_property);
        $scope.monthly_property_management_fees = monthly_property_management_fee($scope.rental_property);
        $scope.annual_property_management_fees = annual_property_management_fees($scope.rental_property);
        $scope.monthly_taxes_percentage = monthly_taxes_percentage($scope.rental_property);
        $scope.annual_taxes = annual_taxes($scope.rental_property);
        $scope.monthly_insurance_percentage = monthly_insurance_percentage($scope.rental_property);
        $scope.annual_insurance_costs = annual_insurance($scope.rental_property);
        $scope.monthly_salaries_and_wages_percentage = monthly_salaries_and_wages_percentage($scope.rental_property);
        $scope.annual_salaries_and_wages = annual_salaries_and_wages($scope.rental_property);
        $scope.annual_salaries_and_wages = annual_salaries_and_wages($scope.rental_property);
        $scope.monthly_utilities_percentage = monthly_utilities_percentage($scope.rental_property);
        $scope.annual_utilities = annual_utilities($scope.rental_property);
        $scope.monthly_water_and_sewer_percentage = monthly_water_and_sewer_percentage($scope.rental_property);
        $scope.annual_water_and_sewer_costs = annual_water_and_sewer_costs($scope.rental_property);
        $scope.monthly_trash_removal_percentage = monthly_trash_removal_percentage($scope.rental_property);
        $scope.annual_trash_removal_costs = annual_trash_removal_costs($scope.rental_property);
      }, true);

      /* --- Private --- */

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

      function annual_trash_removal_costs(property) {
        var expense_increases = property.income_and_cost_projection.operating_expense_increases;
        var monthly_trash_removal = property.operating_expenses_assumption.trash_removal;

        var cost = monthly_trash_removal * 12;
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
    }
  }
});
