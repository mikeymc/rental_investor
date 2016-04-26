angular.module('rentals').directive('operatingExpenses', function(operating_expenses_service) {
  return {
    templateUrl: 'investment_properties_pages/operating_expenses.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.expenses = operating_expenses_service.all_operating_expenses($scope.rental_property);

      }, true);
    }
  }
});
