angular.module('rentals').directive('returnOnInvestment', function(cash_flow_service, operating_expenses_service, property_service, noi_service) {
  return {
    templateUrl: 'investment_properties_pages/return_on_investment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.noi_roi = annual_noi_roi($scope.rental_property);
        $scope.cash_roi = cash_roi($scope.rental_property);
        $scope.total_roi = total_roi($scope.rental_property);
      });

      /* --- Private --- */

      function annual_noi_roi(property) {
        var down_payment = property_service.down_payment(property);
        var operating_expenses = operating_expenses_service.all_operating_expenses(property).total.yearly_costs;
        var gross_income = property_service.get_projected_annual_gross_operating_incomes(property);
        var annual_interest_on_loan = noi_service.get_annual_interest_on_loan(property);
        var depreciation = noi_service.get_annual_building_depreciation(property);

        return _.map(gross_income, function(income, index) {
          return 100 * (income - operating_expenses[index] - annual_interest_on_loan[index] - depreciation) / down_payment;
        });
      }

      function cash_roi(property) {
        var remaining_cf = cash_flow_service.annual_cash_flows_remaining(property);
        var down_payment = property_service.down_payment(property);

        return _.map(remaining_cf, function(cf) {
          return 100 * cf / down_payment;
        });
      }

      function total_roi(property) {
        var remaining_cf = cash_flow_service.annual_cash_flows_remaining(property);
        var yearly_cum_princ = cash_flow_service.yearly_cum_princ(property);
        var down_payment = property_service.down_payment(property);

        return _.map(remaining_cf, function(cf, index) {
          return 100 * (cf + yearly_cum_princ[index]) / down_payment;
        });
      }
    }
  }
});
