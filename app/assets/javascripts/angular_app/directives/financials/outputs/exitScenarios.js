angular.module('rentals').directive('exitScenarios', function(propertyService, keyRentRatiosService, exitScenariosService, cashFlowService, irrService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/exitScenarios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.firstYearExitPrice = exitScenariosService.firstYearExitPrice($scope.rental_property);
        $scope.thirdYearExitPrice = exitScenariosService.thirdYearExitPrice($scope.rental_property);
        $scope.fifthYearExitPrice = exitScenariosService.fifthYearExitPrice($scope.rental_property);

        $scope.firstYearGainOnSale = exitScenariosService.firstYearGainOnSale($scope.rental_property);
        $scope.thirdYearGainOnSale = exitScenariosService.thirdYearGainOnSale($scope.rental_property);
        $scope.fifthYearGainOnSale = exitScenariosService.fifthYearGainOnSale($scope.rental_property);

        $scope.capRate = keyRentRatiosService.getCapitalizationRate($scope.rental_property);

        $scope.oneYearIrr = calculateOneYearInternalRateOfReturn($scope.rental_property);
        $scope.threeYearIrr = calculateThreeYearInternalRateOfReturn($scope.rental_property);
        $scope.fiveYearIrr = calculateFiveYearInternalRateOfReturn($scope.rental_property);

      }, true);

      /* --- Private --- */

      function calculateOneYearInternalRateOfReturn(property) {
        var downPayment = -1 * propertyService.getDownPayment(property);
        var firstYearExitNet = cashFlowService.getOneYearExitNet(property);

        return irrService.calculateInternalRateOfReturn([downPayment, firstYearExitNet]);
      }

      function calculateThreeYearInternalRateOfReturn(property) {
        var downPayment = -1 * propertyService.getDownPayment(property);
        var gainOnSaleInTheThirdYear = exitScenariosService.thirdYearGainOnSale(property);
        var threeYearNets = cashFlowService.getThreeYearExitNets(property, gainOnSaleInTheThirdYear);
        threeYearNets.unshift(downPayment);

        return irrService.calculateInternalRateOfReturn(threeYearNets);
      }

      function calculateFiveYearInternalRateOfReturn(property) {
        var downPayment = -1 * propertyService.getDownPayment(property);
        var gainOnSaleInTheFifthYear = exitScenariosService.fifthYearGainOnSale(property);
        var fiveYearNets = cashFlowService.getFiveYearExitNets(property, gainOnSaleInTheFifthYear);
        fiveYearNets.unshift(downPayment);

        return irrService.calculateInternalRateOfReturn(fiveYearNets);
      }
    }
  }
});
