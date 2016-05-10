angular.module('rentals').directive('navbar', function() {
  return {
    templateUrl: 'investment_properties_pages/navbar.html',
    restrict: 'E',
    link: function($scope) {
      $scope.$watch('user', function() {
        $scope.logged_in_user = $scope.user.email;
      });
    }
  }
});
