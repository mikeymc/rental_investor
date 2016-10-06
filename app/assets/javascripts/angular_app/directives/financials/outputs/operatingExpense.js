angular.module('rentals').directive('operatingExpense', function() {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operatingExpense.html',
    restrict: 'E',
    scope: {
      expense: '=',
      addBorder: '='
    },
    link: function($scope) {
      if($scope.addBorder) {
        $scope.borderStyle = 'add-border-top';
      }
    }
  }
});
