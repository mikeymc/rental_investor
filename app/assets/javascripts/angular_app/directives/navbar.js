angular.module('rentals').directive('navbar', function($state) {
  return {
    templateUrl: 'investment_properties_pages/navbar.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('user', function() {
        $scope.logged_in_user = $scope.user.email;
      });

      $scope.$watch('rental_property', function() {
        if(!$scope.rental_property) {
          return;
        }

        $scope.address = fullPropertyAddress($scope.rental_property);
      });

      $scope.show_property_buttons = function() {
        return $state.current.name != 'rental_properties';
      };

      /* --- Private --- */

      function fullPropertyAddress(property) {
        return property.street +
          ', ' + property.city +
          ', ' + property.state +
          ' ' + property.zip_code;
      }
    }
  }
});
