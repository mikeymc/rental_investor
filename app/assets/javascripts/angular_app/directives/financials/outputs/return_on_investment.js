angular.module('rentals').directive('returnOnInvestment', function(roi_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/return_on_investment.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.noi_roi = roi_service.annual_noi_roi($scope.rental_property);
        $scope.cash_roi = roi_service.cash_roi($scope.rental_property);
        $scope.total_roi = roi_service.total_roi($scope.rental_property);

      }, true);
    }
  }
});
