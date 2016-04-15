//= require jquery/dist/jquery.js
//= require angular/angular.js
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

var rentals = angular.module('rentals', []);
rentals.controller('RentalPropertiesListController', function($scope, $http) {
  $http.get('/api/rental_properties').then(function(response) {
    $scope.rental_properties = response.data;
  }, function() {
    console.log('failure');
  });
});
