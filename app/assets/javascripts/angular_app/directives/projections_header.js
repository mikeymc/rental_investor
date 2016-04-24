angular.module('rentals').directive('projectionsHeader', function() {
  return {
    templateUrl: 'investment_properties_pages/projections_header.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.rent_increases = rent_increases($scope.rental_property);
        $scope.average_rents = average_rents($scope.rental_property, $scope.rent_increases);
        $scope.operating_expenses = operating_expenses($scope.rental_property);
      }, true);

      /* --- Private --- */

      function operating_expenses(property) {
        return property.income_and_cost_projection.operating_expense_increases;
      }

      function rent_increases(property) {
        return property.income_and_cost_projection.rent_increases;
      }

      function average_rents(property, rent_increases) {
        var rent = property.financing_and_income_assumption.average_monthly_rent_per_unit;
        var average_rents = [];
        _.each(rent_increases, function(increase) {
          var new_rent = rent * (1 + (increase / 100));
          rent = new_rent;
          average_rents.push(new_rent);
        });
        return average_rents;
      }
    }
  }
});
