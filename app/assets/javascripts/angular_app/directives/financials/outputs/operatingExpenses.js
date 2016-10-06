angular.module('rentals').directive('operatingExpenses', function(operatingExpensesService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingExpenses.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.individualExpenses = _.values(operatingExpensesService.getAllOperatingExpenses($scope.rental_property));
        $scope.totalExpenses = $scope.individualExpenses.pop();

      }, true);
    }
  }
});
