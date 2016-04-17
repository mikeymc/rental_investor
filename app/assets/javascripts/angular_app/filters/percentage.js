angular.module('rentals').filter('percentage', function() {
  return function(input) {
    return input ? input + '%' : input;
  }
});
