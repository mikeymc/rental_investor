angular.module('rentals').controller('questionnaireController', function($scope, $stateParams, propertyRepository, questionnaireService) {
  $scope.rentalId = $stateParams.rentalId;
  $scope.questions = questionnaireService.getQuestionnaire();

  propertyRepository.find($stateParams.rentalId).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });
});
