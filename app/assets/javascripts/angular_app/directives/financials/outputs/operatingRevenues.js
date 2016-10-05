angular.module('rentals').directive('operatingRevenues', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingRevenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        $scope.monthly_gross_scheduled_rent_income = propertyService.getGrossMonthlyRent($scope.rental_property);
        $scope.vacancy = propertyService.getVacancyOperatingExpense($scope.rental_property);
        $scope.net_rental_income = propertyService.getNetRentalIncome($scope.rental_property);
        $scope.other_income = $scope.rental_property.financing_and_income_assumption.other_monthly_income;
        $scope.gross_income = propertyService.getGrossOperatingIncome($scope.rental_property);
        $scope.projected_gross_annual_rents = propertyService.getProjectedGrossAnnualRents($scope.rental_property);
        $scope.projected_annual_vacancy_costs = propertyService.getProjectedAnnualVacancyCosts($scope.rental_property);
        $scope.projected_annual_net_rental_incomes = propertyService.getProjectedAnnualNetRentalIncomes($scope.rental_property);
        $scope.projected_other_incomes = propertyService.getProjectedOtherIncomes($scope.rental_property);
        $scope.projected_gross_incomes = propertyService.getProjectedAnnualGrossOperatingIncomes($scope.rental_property);
      }, true);
    }
  }
});
