angular.module('rentals').directive('netOperatingIncome', function(operating_expenses_service, property_service) {
  return {
    templateUrl: 'investment_properties_pages/net_operating_income.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        var expenses = operating_expenses_service.all_operating_expenses($scope.rental_property);

        $scope.noi_percentage = 100 - expenses.total.percentage;
        $scope.net_monthly_income = net_monthly_income($scope.rental_property, expenses);
        $scope.net_annual_incomes = net_annual_incomes($scope.rental_property, expenses);

        $scope.monthly_building_depreciation = $scope.rental_property.financing_and_income_assumption.building_cost/27.5/12;
        $scope.annual_building_depreciation = $scope.monthly_building_depreciation * 12;
      }, true);

      /* --- Private --- */

      function net_monthly_income(property, expenses) {
        var gross_income = property_service.get_gross_operating_income(property);
        var total_monthly_expenses = expenses.total.monthly_cost;
        return gross_income - total_monthly_expenses;
      }

      function net_annual_incomes(property, expenses) {
        var incomes = property_service.get_projected_annual_gross_operating_incomes(property);
        return _.map(incomes, function(income, index) {
          return income - expenses.total.yearly_costs[index];
        });
      }
    }
  }
});
