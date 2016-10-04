angular.module('rentals').controller('QuestionnaireController', function($scope, $stateParams, property_repository, $timeout, questionnaireService) {
  $scope.rental_id = $stateParams.rental_id;
  $scope.questions = questionnaireService.getQuestionnaire();

  property_repository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });
});
