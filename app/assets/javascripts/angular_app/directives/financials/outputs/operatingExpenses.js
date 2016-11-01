angular.module('rentals').directive('operatingExpenses', function(operatingExpensesService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingExpenses.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        $scope.individualExpenses = _.values(operatingExpensesService.getAllOperatingExpenses($scope.rentalProperty));
        $scope.totalExpenses = $scope.individualExpenses.pop();

      }, true);
    }
  }
});
