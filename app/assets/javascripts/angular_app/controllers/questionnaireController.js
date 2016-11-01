angular.module('rentals').controller('questionnaireController', function($scope, $stateParams, propertyRepository, questionnaireService) {
  $scope.rentalId = $stateParams.rentalId;
  $scope.questions = questionnaireService.getQuestionnaire();

  propertyRepository.find($stateParams.rentalId).then(function(response) {
    $scope.rentalProperty = response.data.rentalProperty;
  }, function() {
    $state.go('404');
  });
});
