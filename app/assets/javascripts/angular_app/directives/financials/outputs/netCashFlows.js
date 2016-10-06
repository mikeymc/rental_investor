angular.module('rentals').directive('netCashFlows', function(propertyService, cashFlowService, exitScenariosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/netCashFlows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.monthlyCashFlow = -1 * propertyService.getDownPayment($scope.rental_property);
        $scope.oneYearExitNet = cashFlowService.getOneYearExitNet($scope.rental_property);
        $scope.threeYearExitNets = threeYearExitNets($scope.rental_property);
        $scope.fiveYearExitNets = fiveYearExitNets($scope.rental_property);
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
