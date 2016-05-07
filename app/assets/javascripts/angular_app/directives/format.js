angular.module('rentals').directive('format', ['$filter', function($filter) {
  return {
    require: '?ngModel',
    link: function(scope, elem, attrs, ctrl) {
      if (!ctrl) return;
      var plainNumber, shouldResetValue;

      ctrl.$formatters.unshift(function() {
        if (attrs.symbol) {
          return $filter(attrs.format)(ctrl.$modelValue, attrs.symbol, attrs.decimals)
        }
        return $filter(attrs.format)(ctrl.$modelValue, attrs.decimals)
      });

      elem.bind('focus', function() {
        plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        shouldResetValue = true;
      });

      elem.bind('keypress', function(e) {
        if (shouldResetValue === true) {
          elem.val('');
          shouldResetValue = false;
        }
      });

      elem.bind('keyup', function(e) {
        var ENTER = 27;
        var ESC = 13;
        if (e.keyCode === ENTER) {
          elem.val(plainNumber);
          elem.change();
          elem.blur();
        } else if (e.keyCode === ESC) {
          elem.blur();
        }
      });

      elem.bind('blur', function() {
        if (elem.val() === '') {
          elem.val(plainNumber);
        }
        plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        shouldResetValue = false;
        if (attrs.symbol) {
          return elem.val($filter(attrs.format)(plainNumber, attrs.symbol, attrs.decimals));
        }
        return elem.val($filter(attrs.format)(plainNumber, attrs.decimals));
      });
    }
  };
}]);
