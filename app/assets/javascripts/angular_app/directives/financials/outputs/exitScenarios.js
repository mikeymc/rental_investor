angular.module('rentals').directive('exitScenarios', function(propertyService, key_rent_ratios_service, exitScenariosService, cashFlowService, irrService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/exitScenarios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.first_year_exit_price = exitScenariosService.firstYearExitPrice($scope.rental_property);
        $scope.third_year_exit_price = exitScenariosService.thirdYearExitPrice($scope.rental_property);
        $scope.fifth_year_exit_price = exitScenariosService.fifthYearExitPrice($scope.rental_property);

        $scope.first_year_gain_on_sale = exitScenariosService.firstYearGainOnSale($scope.rental_property);
        $scope.third_year_gain_on_sale = exitScenariosService.thirdYearGainOnSale($scope.rental_property);
        $scope.fifth_year_gain_on_sale = exitScenariosService.fifthYearGainOnSale($scope.rental_property);

        $scope.cap_rate = key_rent_ratios_service.get_cap_rate($scope.rental_property);

        $scope.one_year_irr = calculate_one_year_irr($scope.rental_property);
        $scope.three_year_irr = calculate_three_year_irr($scope.rental_property);
        $scope.five_year_irr = calculate_five_year_irr($scope.rental_property);

      }, true);

      /* --- Private --- */

      function calculate_one_year_irr(property) {
        var first_month = -1 * propertyService.getDownPayment(property);
        var first_year_exit_net = cashFlowService.getOneYearExitNet(property);

        return irrService.calculateInternalRateOfReturn([first_month, first_year_exit_net]);
      }

      function calculate_three_year_irr(property) {
        var first_month = -1 * propertyService.getDownPayment(property);
        var gain_on_sale = exitScenariosService.thirdYearGainOnSale(property);
        var three_year_nets = cashFlowService.getThreeYearExitNets(property, gain_on_sale);
        three_year_nets.unshift(first_month);

        return irrService.calculateInternalRateOfReturn(three_year_nets);
      }

      function calculate_five_year_irr(property) {
        var first_month = -1 * propertyService.getDownPayment(property);
        var gain_on_sale = exitScenariosService.fifthYearGainOnSale(property);
        var five_year_nets = cashFlowService.getFiveYearExitNets(property, gain_on_sale);
        five_year_nets.unshift(first_month);

        return irrService.calculateInternalRateOfReturn(five_year_nets);
      }
    }
  }
});
