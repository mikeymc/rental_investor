describe('a property summary', function() {
  var view;

  beforeEach(function() {
    this.inject_dependencies('$scope', 'render_template', 'key_rent_ratios_service', 'property_service', 'roi_service');
    this.$scope.summary = {
      street: '123 Sesame Street',
      city: 'Bunville',
      state: 'TN',
      zip_code: '12345',
      financing_and_income_assumption: {
        number_of_units: 55
      }
    };
    spyOn(this.property_service, 'get_total_cost').and.returnValue('1000');
  });

  describe('the summary data that is shown', function () {
    var summary_row;

    beforeEach(function () {
      spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue('1.23');
      spyOn(this.roi_service, 'cash_roi').and.returnValue(['57.89', '12.22']);
      view = this.render_template('<div rental-property-summary="summary">', this.$scope);
      summary_row = view.find('.rental-property-summary');
    });

    it('shows the address in the first 4 slots', function () {
      expect(summary_row.find('div:nth(0)').text().trim()).toEqual('123 Sesame Street');
      expect(summary_row.find('div:nth(1)').text().trim()).toEqual('Bunville');
      expect(summary_row.find('div:nth(2)').text().trim()).toEqual('TN');
      expect(summary_row.find('div:nth(3)').text().trim()).toEqual('12345');
    });

    it('shows the number of units in the 5th slot', function () {
      expect(summary_row.find('div:nth(4)').text().trim()).toEqual('55');
    });

    it('shows the cap rate in the 6th slot', function () {
      expect(summary_row.find('div:nth(5)').text().trim()).toEqual('1.23%');
    });

    it('shows the cost in the 7th slot', function () {
      expect(summary_row.find('div:nth(6)').text().trim()).toEqual('$1,000');
    });

    it('shows the Cash on Cash ROI in the 8th slot', function () {
      expect(summary_row.find('div:nth(7)').text().trim()).toEqual('57.89%');
    });
  });

  describe('cap rate', function() {
    beforeEach(function() {
      spyOn(this.roi_service, 'cash_roi').and.returnValue('7.89');
    });

    describe('when the cap rate returns a number', function() {
      it('displays the number', function() {
        spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue('1.23');

        view = this.render_template('<div rental-property-summary="summary">', this.$scope);
        this.$scope.$apply();

        expect(view.find('div:nth(6)').text().trim()).toEqual('1.23%');
      });
    });

    describe('when the cap rate does not return a number', function() {
      it('displays --', function() {
        spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue(NaN);

        view = this.render_template('<div rental-property-summary="summary">', this.$scope);

        expect(view.find('div:nth(6)').text().trim()).toEqual('--');
      });
    });
  });
});
