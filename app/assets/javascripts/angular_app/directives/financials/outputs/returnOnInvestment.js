angular.module('rentals').directive('returnOnInvestment', function(roiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/returnOnInvestment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.noiRoi = roiService.getAnnualNetOperatingIncome($scope.rental_property);
        $scope.cashRoi = roiService.getCashOnCashReturn($scope.rental_property);
        $scope.totalRoi = roiService.getTotalReturnOnInvestment($scope.rental_property);

      }, true);
    }
  }
});
