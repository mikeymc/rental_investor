angular.module('rentals').directive('netCashFlows', function(propertyService, cashFlowService, exitScenariosService) {
  return {
    templateUrl: 'investment_properties_pages/financials/outputs/netCashFlows.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('rental_property', function() {
        if (!$scope.rental_property) {
          return;
        }

        $scope.monthly_cash_flow = -1 * propertyService.getDownPayment($scope.rental_property);
        $scope.one_year_exit_net = cashFlowService.getOneYearExitNet($scope.rental_property);
        $scope.three_year_exit_nets = threeYearExitNets($scope.rental_property);
        $scope.five_year_exit_nets = fiveYearExitNets($scope.rental_property);
      }, true);

      /* --- Private --- */

      function threeYearExitNets(property) {
        var gain_on_sale = exitScenariosService.thirdYearGainOnSale(property);
        return cashFlowService.getThreeYearExitNets(property, gain_on_sale);
      }

      function fiveYearExitNets(property) {
        var gain_on_sale = exitScenariosService.fifthYearGainOnSale(property);
        return cashFlowService.getFiveYearExitNets(property, gain_on_sale);
      }
    }
  }
});
