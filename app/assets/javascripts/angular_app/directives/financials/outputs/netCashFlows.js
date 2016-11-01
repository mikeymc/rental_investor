angular.module('rentals').directive('netCashFlows', function(propertyService, cashFlowService, exitScenariosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/netCashFlows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rentalProperty', function() {
        if (!$scope.rentalProperty) {
          return;
        }

        $scope.monthlyCashFlow = -1 * propertyService.getDownPayment($scope.rentalProperty);
        $scope.oneYearExitNet = cashFlowService.getOneYearExitNet($scope.rentalProperty);
        $scope.threeYearExitNets = threeYearExitNets($scope.rentalProperty);
        $scope.fiveYearExitNets = fiveYearExitNets($scope.rentalProperty);
      }, true);

      /* --- Private --- */

      function threeYearExitNets(property) {
        var thirdYearGainOnSale = exitScenariosService.thirdYearGainOnSale(property);
        return cashFlowService.getThreeYearExitNets(property, thirdYearGainOnSale);
      }

      function fiveYearExitNets(property) {
        var fiveYearGainOnSale = exitScenariosService.fifthYearGainOnSale(property);
        return cashFlowService.getFiveYearExitNets(property, fiveYearGainOnSale);
      }
    }
  }
});
