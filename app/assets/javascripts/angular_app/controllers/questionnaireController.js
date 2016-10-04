angular.module('rentals').controller('QuestionnaireController', function($scope, $stateParams, propertyRepository, $timeout, questionnaireService) {
  $scope.rental_id = $stateParams.rental_id;
  $scope.questions = questionnaireService.getQuestionnaire();

  propertyRepository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });
});
