angular.module('rentals').directive('returnOnInvestment', function(roiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/returnOnInvestment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        $scope.noiRoi = roiService.getAnnualNetOperatingIncome($scope.rentalProperty);
        $scope.cashRoi = roiService.getCashOnCashReturn($scope.rentalProperty);
        $scope.totalRoi = roiService.getTotalReturnOnInvestment($scope.rentalProperty);

      }, true);
    }
  }
});
