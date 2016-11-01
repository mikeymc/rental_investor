angular.module('rentals').directive('closingCostsInputs', function(propertyService) {
  return {
    templateUrl: 'investment_properties_pages/financials/inputs/closingCosts.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        $scope.rentalProperty.closingCost.originationFee = propertyService.getLoanOriginationFee($scope.rentalProperty);
        $scope.total = propertyService.getClosingCosts($scope.rentalProperty);
      }, true);
    }
  }
});
