angular.module('rentals').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('sign-in', {
    url: '/sign-in',
    templateUrl: 'user_sessions/new.html'
  });

  $stateProvider.state('sign_up', {
    url: '/sign_up',
    templateUrl: 'user_registrations/new.html',
    controller: 'UserRegistrationsController'
  });

  $stateProvider.state('rental-properties', {
    url: '/rental-properties',
    templateUrl: 'investment_properties_pages/properties_list/rentalPropertiesList.html',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign-in')
        });
      }
    }
  });

  $stateProvider.state('questionnaire', {
    url: '/rental_property/:rentalId/questionnaire',
    templateUrl: 'investment_properties_pages/questionnaire.html',
    controller: 'questionnaireController',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign-in')
        });
      }
    }
  });

  $stateProvider.state('financials', {
    url: '/rental_property/:rentalId',
    templateUrl: 'investment_properties_pages/financials/rentalProperty.html',
    controller: 'RentalPropertyController',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign-in')
        });
      }
    }
  });

  $stateProvider.state('404', {
    url: '/404',
    templateUrl: '404.html'
  });

  $urlRouterProvider.otherwise('/rental-properties');
});
