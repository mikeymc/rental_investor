angular.module('rentals').directive('rentalPropertySummary', function($state, key_rent_ratios_service, property_service) {
  return {
    templateUrl: 'investment_properties_pages/properties_list/rental_property_summary.html',
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
        $scope.total_cost = property_service.get_total_cost($scope.property);
      });

      $scope.goToProperty = function(id) {
        $state.go('rental_property', {rental_id: id});
      };
    }
  }
});
