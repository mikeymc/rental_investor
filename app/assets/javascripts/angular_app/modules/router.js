angular.module('rentals').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('/', {
    url: '/',
    templateUrl: 'investment_properties_pages/rental_properties.html'
  });

  $stateProvider.state('rental_property', {
    url: '/rental_property/:rental_id',
    templateUrl: 'investment_properties_pages/rental_property.html'
  });
});
