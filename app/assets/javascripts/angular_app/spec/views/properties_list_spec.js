describe('the properties list view', function() {
  var view;

  beforeEach(function() {
    this.inject_dependencies('$scope', 'render_template', '$httpBackend', 'key_rent_ratios_service', 'property_service');
    spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue('1.23');
    spyOn(this.property_service, 'get_total_cost').and.returnValue('1000');
    this.$httpBackend.expectGET('/api/rental_properties').respond(200, [{}, {}]);

    view = this.render_template('investment_properties_pages/properties_list/rental_properties.html', this.$scope);
    this.$httpBackend.flush();
  });

  afterEach(function() {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('shows a list of properties', function() {
    expect(view.find('.rental-property-summary').length).toEqual(2);
  });

  describe('adding a new property', function() {
    it('has a "New Property" button', function() {
      expect(view.find('button:contains(New Property)')).toExist();
    });
  })
});
