angular.module('rentals').service('propertyRepository', function($http) {
  return {
    all: function() {
      return $http.get('/api/rental_properties');
    },
    find: function(property_id) {
      return $http.get('/api/rental_properties/' + property_id);
    },
    create: function(property) {
      return $http.post('/api/rental_properties', {rentalProperty: property})
    },
    update: function(property_id, property) {
      return $http.put('/api/rental_properties/' + property_id, {rentalProperty: property});
    },
    remove: function(property_id) {
      return $http.delete('/api/rental_properties/' + property_id);
    }
  }
});
