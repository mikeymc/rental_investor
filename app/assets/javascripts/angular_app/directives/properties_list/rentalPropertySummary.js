angular.module('rentals').directive('rentalPropertySummary', function($state, keyRentRatiosService, propertyService, roiService) {
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

        $scope.capRate = keyRentRatiosService.getCapitalizationRate($scope.property);
        $scope.totalCost = propertyService.getTotalCost($scope.property);
        $scope.yearOneCashOnCashRoi = roiService.getCashOnCashReturn($scope.property)[0];
      });

      $scope.goToProperty = function(id) {
        $state.go('financials', {rentalId: id});
      };
    }
  }
});
