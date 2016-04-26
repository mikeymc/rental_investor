angular.module('rentals').directive('cashFlowFromOperations', function(property_service, operating_expenses_service) {
  return {
    templateUrl: 'investment_properties_pages/cash_flow_from_operations.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        var expenses = operating_expenses_service.all_operating_expenses($scope.rental_property);

        $scope.monthly_debt_service = property_service.monthly_loan_payment($scope.rental_property);
        $scope.annual_debt_service = $scope.monthly_debt_service * 12;
        $scope.cash_available_for_loan_servicing = property_service.get_net_operating_income(
          $scope.rental_property,
          expenses);
        $scope.annual_cash_available_for_loan_servicing = property_service.get_net_annual_operating_incomes(
          $scope.rental_property,
          expenses);
      }, true);
    }
  }
});
