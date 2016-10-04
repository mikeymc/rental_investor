angular.module('rentals').directive('newPropertyModal', function() {
  return {
    templateUrl: 'investment_properties_pages/properties_list/newPropertyModal.html',
    restrict: 'E',
    replace: true,
    scope: {
      createProperty: '=',
      cancel: '='
    },
    link: function($scope) {
      $scope.new_property = {};
    }
  }
});
