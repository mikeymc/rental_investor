describe('the properties list page', function () {
  var view;

  beforeEach(function() {
    this.injectDependencies('$scope', 'renderTemplate', '$httpBackend', '$state');
    this.$httpBackend.expectGET('/api/rental_properties').respond(200, fixtures.rentalProperties());

    view = this.renderTemplate('investment_properties_pages/properties_list/rentalPropertiesList.html', this.$scope);
    this.$httpBackend.flush();
  });

  it('shows the list of available properties', function () {
    expect(view.find('.rental-property-summary').length).toEqual(2);

    var firstProperty = view.find('.rental-property-summary:nth(0)');
    expect(firstProperty.find('div:nth(0)').text().trim()).toEqual('421 Moroni Blvd');
    expect(firstProperty.find('div:nth(1)').text().trim()).toEqual('Salt Lake City');
    expect(firstProperty.find('div:nth(2)').text().trim()).toEqual('UT');
    expect(firstProperty.find('div:nth(3)').text().trim()).toEqual('12345');
    expect(firstProperty.find('div:nth(4)').text().trim()).toEqual('60');
    expect(firstProperty.find('div:nth(5)').text().trim()).toEqual('8.36%');
    expect(firstProperty.find('div:nth(6)').text().trim()).toEqual('$3,033,420');
    expect(firstProperty.find('div:nth(7)').text().trim()).toEqual('12.29%');

    var secondProperty = view.find('.rental-property-summary:nth(1)');
    expect(secondProperty.find('div:nth(0)').text().trim()).toEqual('123 Sesame St');
    expect(secondProperty.find('div:nth(1)').text().trim()).toEqual('Buffalo');
    expect(secondProperty.find('div:nth(2)').text().trim()).toEqual('NY');
    expect(secondProperty.find('div:nth(3)').text().trim()).toEqual('67890');
    expect(secondProperty.find('div:nth(4)').text().trim()).toEqual('6');
    expect(secondProperty.find('div:nth(5)').text().trim()).toEqual('6.91%');
    expect(secondProperty.find('div:nth(6)').text().trim()).toEqual('$305,410');
    expect(secondProperty.find('div:nth(7)').text().trim()).toEqual('11.65%');
  });

  describe('clicking on the first property', function () {
    it('does a state change to that property', function () {
      spyOn(this.$state, 'go');
      var firstProperty = view.find('.rental-property-summary:nth(0) div:nth(0)');
      firstProperty.click();

      expect(this.$state.go).toHaveBeenCalledWith('financials', {rentalId: 1});
    });
  });

  describe('clicking on the second property', function () {
    it('does a state change to that property', function () {
      spyOn(this.$state, 'go');
      var secondProperty = view.find('.rental-property-summary:nth(1) div:nth(0)');
      secondProperty.click();

      expect(this.$state.go).toHaveBeenCalledWith('financials', {rentalId: 2});
    });
  });
});