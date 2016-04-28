angular.module('rentals').directive('netOperatingIncome', function(operating_expenses_service, noi_service) {
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
        $scope.net_monthly_income = noi_service.net_monthly_income($scope.rental_property, expenses);
        $scope.net_annual_incomes = noi_service.net_annual_incomes($scope.rental_property, expenses);
        $scope.monthly_building_depreciation = noi_service.get_monthly_building_depreciation($scope.rental_property);
        $scope.annual_building_depreciation = noi_service.get_annual_building_depreciation($scope.rental_property);
        $scope.monthly_interest_on_loan_percentage = noi_service.monthly_interest_on_loan_percentage($scope.rental_property);
        $scope.monthly_interest_on_loan = noi_service.monthly_interest_on_loan($scope.rental_property);
        $scope.annual_interest_on_loan = noi_service.get_annual_interest_on_loan($scope.rental_property);
        $scope.monthly_net_income_before_taxes = noi_service.monthly_net_income_before_taxes($scope.rental_property, expenses);
        $scope.annual_net_income_before_taxes = noi_service.annual_net_income_before_taxes($scope.rental_property, expenses);

      }, true);
    }
  }
});
