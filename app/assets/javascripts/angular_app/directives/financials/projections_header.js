angular.module('rentals').directive('projectionsHeader', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/projections_header.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.rent_increases = rent_increases($scope.rental_property);
        $scope.average_rents = property_service.get_projected_average_rents($scope.rental_property);
        $scope.operating_expenses = operating_expenses($scope.rental_property);
      }, true);

      /* --- Private --- */

      function operating_expenses(property) {
        return property.income_and_cost_projection.operating_expense_increases;
      }

      function rent_increases(property) {
        return property.income_and_cost_projection.rent_increases;
      }
    }
  }
});
