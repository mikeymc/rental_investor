angular.module('rentals').directive('newPropertyModal', function() {
  return {
    templateUrl: 'investment_properties_pages/properties_list/newPropertyModal.html',
    restrict: 'E',
    replace: true,
    scope: {
      createProperty: '='
    },
    link: function($scope) {
      $scope.newProperty = {};
    }
  }
});
