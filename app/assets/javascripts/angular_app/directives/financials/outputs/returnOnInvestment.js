angular.module('rentals').directive('returnOnInvestment', function(roiService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/returnOnInvestment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.noi_roi = roiService.annual_noi_roi($scope.rental_property);
        $scope.cash_roi = roiService.cash_roi($scope.rental_property);
        $scope.total_roi = roiService.total_roi($scope.rental_property);

      }, true);
    }
  }
});
