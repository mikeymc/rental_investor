angular.module('rentals').directive('financingAssumptions', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/financing_assumptions.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var property = $scope.rental_property;

        $scope.equity_percentage = property.financing_and_income_assumption.equity_percentage;
        $scope.total_closing_costs = property_service.get_closing_costs(property);
        $scope.total_cost = property_service.get_total_cost(property);
        $scope.down_payment = property_service.down_payment(property);
        $scope.balance_to_finance_percentage = property_service.percent_to_finance(property);
        $scope.balance_to_finance = property_service.balance_to_finance(property);
        $scope.monthly_interest_rate = property.financing_and_income_assumption.loan_interest_rate / 12;
        $scope.amortization_period_in_months = property.financing_and_income_assumption.amortization_period_in_years * 12;
        $scope.monthly_loan_payment = property_service.monthly_loan_payment(property);
        $scope.annual_loan_payment = $scope.monthly_loan_payment * 12;

      }, true);
    }
  }
});
