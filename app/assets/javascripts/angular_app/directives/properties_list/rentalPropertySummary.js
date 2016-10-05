angular.module('rentals').directive('rentalPropertySummary', function($state, key_rent_ratios_service, propertyService, roi_service) {
  return {
    templateUrl: 'investment_properties_pages/properties_list/rentalPropertySummary.html',
    restrict: 'A',
    replace: true,
    scope: {
      property: '=rentalPropertySummary',
      remove: '&'
    },
    link: function($scope) {
      $scope.$watch('property', function() {
        if (!$scope.property) {
          return;
        }

        $scope.cap_rate = key_rent_ratios_service.get_cap_rate($scope.property);
        $scope.total_cost = propertyService.getTotalCost($scope.property);
        $scope.year_one_cash_on_cash_roi = roi_service.cash_roi($scope.property)[0];
      });

      $scope.goToProperty = function(id) {
        $state.go('financials', {rental_id: id});
      };
    }
  }
});
