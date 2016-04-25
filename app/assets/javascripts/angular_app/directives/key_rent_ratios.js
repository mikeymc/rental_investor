angular.module('rentals').directive('keyRentRatios', function(property_service, $filter) {
  return {
    templateUrl: 'investment_properties_pages/key_rent_ratios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        var service = property_service;
        $scope.avg_sq_ft_per_unit = service.get_avg_area_per_unit($scope.rental_property);
        $scope.avg_rent_per_sq_ft = service.get_avg_rent_per_sq_ft($scope.rental_property);
        $scope.total_cost_per_sq_ft = service.get_total_cost_per_sq_ft($scope.rental_property);
        $scope.cost_per_unit = service.get_cost_per_unit($scope.rental_property);
      }, true);
    }
  }
});
