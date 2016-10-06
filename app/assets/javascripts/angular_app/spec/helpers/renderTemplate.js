angular.module('rentals').service('renderTemplate', function($templateCache, $compile) {
  function isTemplateFile(template) {
    return _.last(template, 5).join('') === '.html';
  }

  function compileTemplate(template, $scope) {
    var linkedElement = $compile(template)($scope);
    var renderedElement = $('<div></div>').append(linkedElement);
    $scope.$apply();

    return renderedElement;
  }

  return function renderTemplate(template, $scope) {
    var templateToCompile = isTemplateFile(template) ? $templateCache.get(template) : template;

    return compileTemplate(templateToCompile, $scope);
  };
});
