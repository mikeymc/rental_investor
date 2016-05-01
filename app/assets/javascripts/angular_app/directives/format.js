angular.module('rentals').directive('format', ['$filter', function($filter) {
  return {
    require: '?ngModel',
    link: function(scope, elem, attrs, ctrl) {
      if (!ctrl) return;

      ctrl.$formatters.unshift(function() {
        if (attrs.symbol) {
          return $filter(attrs.format)(ctrl.$modelValue, attrs.symbol, attrs.decimals)
        }
        return $filter(attrs.format)(ctrl.$modelValue, attrs.decimals)
      });

      elem.bind('focus', function() {
        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val(plainNumber);
      });

      elem.bind('blur', function() {
        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        if (attrs.symbol) {
          return elem.val($filter(attrs.format)(plainNumber, attrs.symbol, attrs.decimals));
        }
        return elem.val($filter(attrs.format)(plainNumber, attrs.decimals));
      });
    }
  };
}]);
