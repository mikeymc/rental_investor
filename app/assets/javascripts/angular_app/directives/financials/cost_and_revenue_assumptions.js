angular.module('rentals').directive('costAndRevenueAssumptions', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/financials/cost_and_revenue_assumptions.html',
    restrict: 'E',
    link: function($scope) {
      var s = property_service;
      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }
        if ($scope.rental_property.closing_cost && $scope.rental_property.financing_and_income_assumption) {
          $scope.total_closing_costs = s.get_closing_costs($scope.rental_property);
          $scope.gross_monthly_rent = s.get_gross_monthly_rent($scope.rental_property);
          $scope.total_cost = s.get_total_cost($scope.rental_property);
          $scope.total_gross_monthly_income = s.get_total_gross_monthly_income($scope.rental_property);
        }
      }, true);
    }
  }
});
