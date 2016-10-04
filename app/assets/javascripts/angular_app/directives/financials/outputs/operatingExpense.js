angular.module('rentals').directive('operatingExpense', function() {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/operating_expense.html',
    restrict: 'E',
    scope: {
      expense: '=',
      addBorder: '='
    },
    link: function($scope) {
      $scope.add_border = $scope.addBorder;
      if($scope.add_border) {
        $scope.border_style = 'add-border-top';
      }
    }
  }
});
