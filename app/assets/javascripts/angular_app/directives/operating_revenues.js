angular.module('rentals').directive('operatingRevenues', function(property_service) {
  return {
    templateUrl: 'investment_properties_pages/operating_revenues.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }
        $scope.monthly_gross_scheduled_rent_income = property_service.get_gross_monthly_rent($scope.rental_property);
        $scope.vacancy = vacancy($scope.rental_property);
        $scope.net_rental_income = net_rental_income($scope.rental_property);
        $scope.other_income = $scope.rental_property.financing_and_income_assumption.other_monthly_income;
        $scope.gross_income = gross_income($scope.rental_property);
        $scope.projected_gross_annual_rents = projected_gross_annual_rents($scope.rental_property);
        $scope.projected_annual_vacancy_costs = projected_annual_vacancy_costs($scope.rental_property);
        $scope.projected_annual_net_rental_incomes = projected_annual_net_rental_incomes($scope.rental_property);
        $scope.projected_other_incomes = projected_other_incomes($scope.rental_property);
        $scope.projected_gross_incomes = projected_gross_incomes($scope.rental_property);
      }, true);

      /* --- Private --- */

      function gross_income(property) {
        var net_income = net_rental_income(property);
        var other_income = property.financing_and_income_assumption.other_monthly_income;
        return net_income + parseFloat(other_income)
      }

      function vacancy(property) {
        var vacancy_rate = property.operating_expenses_assumption.vacancy_rate;
        var gross_rent = property_service.get_gross_monthly_rent(property);
        return gross_rent * vacancy_rate / 100;
      }

      function net_rental_income(property) {
        var gross_rent = property_service.get_gross_monthly_rent(property);
        var vacancy_cost = vacancy(property);
        return gross_rent - vacancy_cost;
      }

      function projected_gross_incomes(property) {
        var projected_nets = projected_annual_net_rental_incomes(property);
        var projected_others = projected_other_incomes(property);

        return _.map(projected_nets, function(net, index) {
          return net + projected_others[index];
        });
      }

      function projected_other_incomes(property) {
        var rent_increases = property.income_and_cost_projection.rent_increases;
        var income = 12 * property.financing_and_income_assumption.other_monthly_income;

        return _.map(rent_increases, function(increase) {
          income = income * (1 + increase / 100);
          return income;
        });
      }

      function projected_annual_net_rental_incomes(property) {
        var gross_incomes = projected_gross_annual_rents(property);
        var vacancy_costs = projected_annual_vacancy_costs(property);

        return _.map(gross_incomes, function(income, index) {
          return income - vacancy_costs[index];
        });
      }

      function projected_annual_vacancy_costs(property) {
        var rents = projected_gross_annual_rents(property);
        var vacancy_rate = property.operating_expenses_assumption.vacancy_rate / 100;

        return _.map(rents, function(rent) {
          return rent * vacancy_rate;
        })
      }

      function projected_gross_annual_rents(property) {
        var projected_average_monthly_rents = property_service.get_projected_average_rents(property);
        var number_of_units = property.financing_and_income_assumption.number_of_units;

        return _.map(projected_average_monthly_rents, function(rent) {
          return rent * 12 * number_of_units;
        })
      }
    }
  }
});
