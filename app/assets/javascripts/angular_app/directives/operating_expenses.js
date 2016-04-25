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
      }, true);

      /* --- Private --- */

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
