angular.module('rentals').directive('rentalPropertySummary', function($state) {
  return {
    templateUrl: 'investment_properties_pages/rental_property_summary.html',
    restrict: 'A',
    replace: true,
    scope: {
      rentalPropertySummary: '=',
      remove: '&'
    },
    link: function($scope) {
      $scope.property = $scope.rentalPropertySummary;

      $scope.goToProperty = function(id) {
        $state.go('rental_property', {rental_id: id});
      };
    }
  }
});
