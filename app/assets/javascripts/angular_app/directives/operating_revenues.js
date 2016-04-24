angular.module('rentals').directive('operatingRevenues', function(cost_and_revenue_assumptions_service) {
  return {
    templateUrl: 'investment_properties_pages/operating_revenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        $scope.monthly_gross_scheduled_rent_income = cost_and_revenue_assumptions_service.get_gross_monthly_rent(
          $scope.rental_property
        );
        $scope.vacancy = vacancy(
          $scope.monthly_gross_scheduled_rent_income,
          $scope.rental_property.operating_expenses_assumption.vacancy_rate
        );
        $scope.net_rental_income = net_rental_income(
          $scope.monthly_gross_scheduled_rent_income,
          $scope.vacancy
        );
        $scope.other_income = $scope.rental_property.financing_and_income_assumption.other_monthly_income;
        $scope.gross_income = gross_income($scope.net_rental_income, $scope.other_income);
      }, true);

      /* --- Private --- */

      function gross_income(net_income, other_income) {
        return net_income + parseFloat(other_income)
      }

      function vacancy(gross_rent, vacancy_rate) {
        return gross_rent * vacancy_rate / 100;
      }

      function net_rental_income(gross_rent, vacancy) {
        return gross_rent - vacancy;
      }
    }
  }
});
