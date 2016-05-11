angular.module('rentals').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/rental_properties');

  $stateProvider.state('sign_in', {
    url: '/sign_in',
    templateUrl: 'user_sessions/new.html'
  });

  $stateProvider.state('sign_up', {
    url: '/sign_up',
    templateUrl: 'user_registrations/new.html',
    controller: 'UserRegistrationsController'
  });

  $stateProvider.state('/rental_properties', {
    url: '/rental_properties',
    templateUrl: 'investment_properties_pages/rental_properties.html',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign_in')
        });
      }
    }
  });

  $stateProvider.state('rental_property', {
    url: '/rental_property/:rental_id',
    templateUrl: 'investment_properties_pages/rental_property.html',
    controller: 'RentalPropertyController',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign_in')
        });
      }
    }
  });

  $stateProvider.state('404', {
    url: '/404',
    templateUrl: '404.html'
  });
});
