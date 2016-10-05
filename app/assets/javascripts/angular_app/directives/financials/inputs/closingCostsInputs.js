angular.module('rentals').directive('closingCostsInputs', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/inputs/closingCosts.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.rental_property.closing_cost.origination_fee = property_service.getLoanOriginationFee($scope.rental_property);
        $scope.total = property_service.getClosingCosts($scope.rental_property);
      }, true);
    }
  }
});
