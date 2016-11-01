angular.module('rentals').directive('navbar', function($state) {
  return {
    templateUrl: 'investment_properties_pages/navbar.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('user', function() {
        $scope.logged_in_user = $scope.user.email;
      });

      $scope.$watch('rentalProperty', function() {
        if(!$scope.rentalProperty) {
          return;
        }

        $scope.address = fullPropertyAddress($scope.rentalProperty);
      });

      $scope.show_property_buttons = function() {
        return $state.current.name != 'rental-properties';
      };

      /* --- Private --- */

      function fullPropertyAddress(property) {
        return property.street +
          ', ' + property.city +
          ', ' + property.state +
          ' ' + property.zipCode;
      }
    }
  }
});
