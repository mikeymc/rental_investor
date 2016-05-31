angular.module('rentals').directive('newPropertyModal', function() {
  return {
    templateUrl: 'investment_properties_pages/properties_list/new_property_modal.html',
    restrict: 'E',
    replace: true
  }
});
