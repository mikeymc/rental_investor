angular.module('rentals').controller('QuestionnaireController', function($scope, $stateParams, property_repository, $timeout, questionnaire_service) {
  $scope.rental_id = $stateParams.rental_id;
  $scope.questions = questionnaire_service.get_questionnaire();

  property_repository.find($stateParams.rental_id).then(function(response) {
    $scope.rental_property = response.data;
  }, function() {
    $state.go('404');
  });
});
