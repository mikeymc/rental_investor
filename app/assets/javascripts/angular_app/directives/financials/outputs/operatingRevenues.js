angular.module('rentals').directive('operatingRevenues', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingRevenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }
        $scope.monthlyGrossScheduledRentIncome = propertyService.getGrossMonthlyRent($scope.rentalProperty);
        $scope.vacancy = propertyService.getVacancyOperatingExpense($scope.rentalProperty);
        $scope.netRentalIncome = propertyService.getNetRentalIncome($scope.rentalProperty);
        $scope.otherIncome = $scope.rentalProperty.financingAndIncomeAssumption.otherMonthlyIncome;
        $scope.grossIncome = propertyService.getGrossOperatingIncome($scope.rentalProperty);
        $scope.projectedGrossAnnualRents = propertyService.getProjectedGrossAnnualRents($scope.rentalProperty);
        $scope.projectedAnnualVacancyCosts = propertyService.getProjectedAnnualVacancyCosts($scope.rentalProperty);
        $scope.projectedAnnualNetRentalIncomes = propertyService.getProjectedAnnualNetRentalIncomes($scope.rentalProperty);
        $scope.projectedOtherIncomes = propertyService.getProjectedOtherIncomes($scope.rentalProperty);
        $scope.projectedGrossIncomes = propertyService.getProjectedAnnualGrossOperatingIncomes($scope.rentalProperty);
      }, true);
    }
  }
});
