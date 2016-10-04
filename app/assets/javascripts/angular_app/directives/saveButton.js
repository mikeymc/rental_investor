angular.module('rentals').directive('saveButton', function(propertyRepository, $timeout) {
  return {
    templateUrl: 'investment_properties_pages/save_button.html',
    restrict: 'E',
    scope: {
      rental_id: '=rentalId',
      rental_property: '=rentalProperty'
    },
    link: function($scope) {
      $scope.persistence_state = 'Save';

      $scope.save = function() {
        propertyRepository.update($scope.rental_id, $scope.rental_property).then(function(response) {
          $scope.rental_property = response.data;
          displaySavedFlag();
        });
      };

      /* --- Private --- */

      function displaySavedFlag() {
        function toggleSaved(flag) {
          if (flag) {
            $scope.persistence_state = 'Saved!';
          } else {
            $scope.persistence_state = 'Save';
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
