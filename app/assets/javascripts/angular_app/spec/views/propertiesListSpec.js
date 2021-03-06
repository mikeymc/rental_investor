describe('the properties list view', function () {
  var view;

  beforeEach(function () {
    this.injectDependencies('$scope', 'renderTemplate', '$httpBackend', 'keyRentRatiosService', 'propertyService', 'roiService');
    spyOn(this.keyRentRatiosService, 'getCapitalizationRate').and.returnValue('1.23');
    spyOn(this.roiService, 'getCashOnCashReturn').and.returnValue('1.23');
    spyOn(this.propertyService, 'getTotalCost').and.returnValue('1000');
    this.$httpBackend.expectGET('/api/rental_properties').respond(200, fixtures.rentalProperties());

    view = this.renderTemplate('investment_properties_pages/properties_list/rentalPropertiesList.html', this.$scope);
    this.$httpBackend.flush();
  });

  afterEach(function () {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('shows a list of properties', function () {
    expect(view.find('.rental-property-summary').length).toEqual(2);
    expect(view.find('.rental-property-summary:nth(0)').text()).toContain('421 Moroni Blvd');
    expect(view.find('.rental-property-summary:nth(1)').text()).toContain('123 Sesame St');
  });

  describe('the header for the summary list', function () {
    it('has the right column names', function() {
      var header_row = view.find('.rental-properties-list .row:nth(1)');
      expect(header_row.find('div:nth(0)').text().trim()).toEqual('Street');
      expect(header_row.find('div:nth(1)').text().trim()).toEqual('City');
      expect(header_row.find('div:nth(2)').text().trim()).toEqual('State');
      expect(header_row.find('div:nth(3)').text().trim()).toEqual('Zip');
      expect(header_row.find('div:nth(4)').text().trim()).toEqual('Units');
      expect(header_row.find('div:nth(5)').text().trim()).toEqual('Cap Rate');
      expect(header_row.find('div:nth(6)').text().trim()).toEqual('Cost');
      expect(header_row.find('div:nth(7)').text().trim()).toEqual('CoC ROI');
      expect(header_row.find('div:nth(8)').text().trim()).toEqual('Actions');
    })
  });

  describe('adding a new property', function () {
    it('has a "New Property" button', function () {
      expect(view.find('button:contains(New Property)')).toExist();
    });
  })
});
