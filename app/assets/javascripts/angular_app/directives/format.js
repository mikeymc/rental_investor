angular.module('rentals').directive('format', ['$filter', function($filter) {
  return {
    require: '?ngModel',
    link: function(scope, elem, attrs, ctrl) {
      if (!ctrl) return;

      ctrl.$formatters.unshift(function() {
        return $filter(attrs.format)(ctrl.$modelValue)
      });

      elem.bind('focus', function() {
        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val(plainNumber);
      });

      elem.bind('blur', function() {
        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val($filter(attrs.format)(plainNumber));
      });
    }
  };
}]);
