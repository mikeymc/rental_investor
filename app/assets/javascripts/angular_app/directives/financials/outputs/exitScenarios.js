angular.module('rentals').directive('exitScenarios', function(propertyService, keyRentRatiosService, exitScenariosService, cashFlowService, irrService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/exitScenarios.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        $scope.firstYearExitPrice = exitScenariosService.firstYearExitPrice($scope.rentalProperty);
        $scope.thirdYearExitPrice = exitScenariosService.thirdYearExitPrice($scope.rentalProperty);
        $scope.fifthYearExitPrice = exitScenariosService.fifthYearExitPrice($scope.rentalProperty);

        $scope.firstYearGainOnSale = exitScenariosService.firstYearGainOnSale($scope.rentalProperty);
        $scope.thirdYearGainOnSale = exitScenariosService.thirdYearGainOnSale($scope.rentalProperty);
        $scope.fifthYearGainOnSale = exitScenariosService.fifthYearGainOnSale($scope.rentalProperty);

        $scope.capRate = keyRentRatiosService.getCapitalizationRate($scope.rentalProperty);

        $scope.oneYearIrr = calculateOneYearInternalRateOfReturn($scope.rentalProperty);
        $scope.threeYearIrr = calculateThreeYearInternalRateOfReturn($scope.rentalProperty);
        $scope.fiveYearIrr = calculateFiveYearInternalRateOfReturn($scope.rentalProperty);

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
