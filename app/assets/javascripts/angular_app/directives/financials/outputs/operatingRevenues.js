angular.module('rentals').directive('operatingRevenues', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingRevenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        $scope.monthly_gross_scheduled_rent_income = property_service.get_gross_monthly_rent($scope.rental_property);
        $scope.vacancy = property_service.get_vacancy_operating_expense($scope.rental_property);
        $scope.net_rental_income = property_service.get_net_rental_income($scope.rental_property);
        $scope.other_income = $scope.rental_property.financing_and_income_assumption.other_monthly_income;
        $scope.gross_income = property_service.get_gross_operating_income($scope.rental_property);
        $scope.projected_gross_annual_rents = property_service.get_projected_gross_annual_rents($scope.rental_property);
        $scope.projected_annual_vacancy_costs = property_service.get_projected_annual_vacancy_costs($scope.rental_property);
        $scope.projected_annual_net_rental_incomes = property_service.get_projected_annual_net_rental_incomes($scope.rental_property);
        $scope.projected_other_incomes = property_service.get_projected_other_incomes($scope.rental_property);
        $scope.projected_gross_incomes = property_service.get_projected_annual_gross_operating_incomes($scope.rental_property);
      }, true);
    }
  }
});
