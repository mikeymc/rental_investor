angular.module('rentals').directive('operatingExpenses', function(property_service) {
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
      }, true);

      /* --- Private --- */

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
