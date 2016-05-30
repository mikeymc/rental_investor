angular.module('rentals').filter('percentage', function($filter) {
  return function(input, decimals) {
    var round = decimals ? decimals : 0;
    return exists(input) ? $filter('number')(input, round) + '%' : '--';
  };

  function exists(input) {
    if (input === null) {
      return false;
    }
    if (isNaN(input)) {
      return false;
    }
    return true;
  }
});
