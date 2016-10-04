angular.module('rentals').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('sign_in', {
    url: '/sign_in',
    templateUrl: 'user_sessions/new.html'
  });

  $stateProvider.state('sign_up', {
    url: '/sign_up',
    templateUrl: 'user_registrations/new.html',
    controller: 'UserRegistrationsController'
  });

  $stateProvider.state('rental_properties', {
    url: '/rental_properties',
    templateUrl: 'investment_properties_pages/properties_list/rentalProperties.html',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign_in')
        });
      }
    }
  });

  $stateProvider.state('questionnaire', {
    url: '/rental_property/:rental_id/questionnaire',
    templateUrl: 'investment_properties_pages/questionnaire.html',
    controller: 'QuestionnaireController',
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function() {
          $state.go('sign_in')
        });
      }
    }
  });

  $stateProvider.state('financials', {
    url: '/rental_property/:rental_id',
    templateUrl: 'investment_properties_pages/financials/rentalProperty.html',
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

  $urlRouterProvider.otherwise('/rental_properties');
});
