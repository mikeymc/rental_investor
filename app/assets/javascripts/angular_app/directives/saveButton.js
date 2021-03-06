angular.module('rentals').directive('saveButton', function(propertyRepository, $timeout) {
  return {
    templateUrl: 'investment_properties_pages/saveButton.html',
    restrict: 'E',
    scope: {
      rentalId: '=',
      rentalProperty: '='
    },
    link: function($scope) {
      $scope.persistenceState = 'Save';

      $scope.save = function() {
        propertyRepository.update($scope.rentalId, $scope.rentalProperty).then(function(response) {
          $scope.rentalProperty = response.data.rentalProperty;
          displaySavedFlag();
        });
      };

      /* --- Private --- */

      function displaySavedFlag() {
        function toggleSaved(flag) {
          if (flag) {
            $scope.persistenceState = 'Saved!';
          } else {
            $scope.persistenceState = 'Save';
          }
          $timeout(function() {
            $scope.$apply();
          }, 0);
        }

        toggleSaved(true);
        $timeout(function() {
          toggleSaved(false);
        }, 3000);
      }
    }
  }
});
