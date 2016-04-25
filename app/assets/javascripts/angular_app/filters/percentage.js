angular.module('rentals').filter('percentage', function($filter) {
  return function(input, decimals) {
    var round = decimals ? decimals : 0;
    return (input !== null) ? $filter('number')(input, round) + '%' : input;
  }
});
