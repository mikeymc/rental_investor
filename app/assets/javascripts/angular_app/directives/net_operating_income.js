angular.module('rentals').directive('netOperatingIncome', function(operating_expenses_service, property_service, cash_flow_service) {
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
        $scope.monthly_building_depreciation = get_monthly_building_depreciation($scope.rental_property);
        $scope.annual_building_depreciation = get_annual_building_depreciation($scope.rental_property);
        $scope.monthly_interest_on_loan_percentage = monthly_interest_on_loan_percentage($scope.rental_property);
        $scope.monthly_interest_on_loan = monthly_interest_on_loan($scope.rental_property);
        $scope.annual_interest_on_loan = get_annual_interest_on_loan($scope.rental_property);
      }, true);

      /* --- Private --- */

      function get_annual_building_depreciation(property) {
        return 12 * get_monthly_building_depreciation(property);
      }

      function get_monthly_building_depreciation(property) {
        return property.financing_and_income_assumption.building_cost / 27.5 / 12;
      }

      function get_annual_interest_on_loan(property) {
        var yearly_principal_reductions = cash_flow_service.yearly_cum_princ(property);
        var yearly_debt_service = cash_flow_service.annual_debt_service(property);

        return _.map(yearly_principal_reductions, function(reduction) {
          return yearly_debt_service - reduction;
        });
      }

      function monthly_interest_on_loan_percentage(property) {
        return 100 * monthly_interest_on_loan(property) / property_service.get_gross_operating_income(property);
      }

      function monthly_interest_on_loan(property) {
        return property_service.monthly_loan_payment(property) - cash_flow_service.monthly_cum_princ(property);
      }

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
