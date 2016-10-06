angular.module('rentals').directive('operatingRevenues', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingRevenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        $scope.monthlyGrossScheduledRentIncome = propertyService.getGrossMonthlyRent($scope.rental_property);
        $scope.vacancy = propertyService.getVacancyOperatingExpense($scope.rental_property);
        $scope.netRentalIncome = propertyService.getNetRentalIncome($scope.rental_property);
        $scope.otherIncome = $scope.rental_property.financing_and_income_assumption.other_monthly_income;
        $scope.grossIncome = propertyService.getGrossOperatingIncome($scope.rental_property);
        $scope.projectedGrossAnnualRents = propertyService.getProjectedGrossAnnualRents($scope.rental_property);
        $scope.projectedAnnualVacancyCosts = propertyService.getProjectedAnnualVacancyCosts($scope.rental_property);
        $scope.projectedAnnualNetRentalIncomes = propertyService.getProjectedAnnualNetRentalIncomes($scope.rental_property);
        $scope.projectedOtherIncomes = propertyService.getProjectedOtherIncomes($scope.rental_property);
        $scope.projectedGrossIncomes = propertyService.getProjectedAnnualGrossOperatingIncomes($scope.rental_property);
      }, true);
    }
  }
});
