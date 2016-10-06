angular.module('rentals').directive('returnOnInvestment', function(roiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/returnOnInvestment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.noi_roi = roiService.getAnnualNetOperatingIncome($scope.rental_property);
        $scope.cash_roi = roiService.getCashOnCashReturn($scope.rental_property);
        $scope.total_roi = roiService.getTotalReturnOnInvestment($scope.rental_property);

      }, true);
    }
  }
});
