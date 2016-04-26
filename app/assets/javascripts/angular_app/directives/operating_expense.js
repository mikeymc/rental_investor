angular.module('rentals').directive('operatingExpense', function() {
  return {
    templateUrl: 'investment_properties_pages/operating_expense.html',
    restrict: 'E',
    scope: {
      expense: '='
    }
  }
});
