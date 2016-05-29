angular.module('rentals').directive('closingCostsInputs', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/inputs/closing_costs.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.rental_property.closing_cost.origination_fee = property_service.get_loan_origination_fee($scope.rental_property);
        $scope.total = property_service.get_closing_costs($scope.rental_property);
      }, true);
    }
  }
});