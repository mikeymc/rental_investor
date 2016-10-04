describe('a property summary', function() {
  var view;

  beforeEach(function() {
    this.inject_dependencies('$scope', 'render_template', 'key_rent_ratios_service', 'property_service');
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

  describe('before any data exists', function () {
    beforeEach(function () {
      this.$scope.summary = null;
      view = this.render_template('<div rental-property-summary="summary">', this.$scope);
    });

    it('shows nothing', function () {
      expect(view.text().trim()).toEqual('--');
    });
  });

  describe('the summary data that is shown', function () {
    beforeEach(function () {
      spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue('1.23');
      view = this.render_template('<div rental-property-summary="summary">', this.$scope);
    });

    it('shows the address', function () {
      expect(view.text()).toContain('123 Sesame Street');
      expect(view.text()).toContain('Bunville');
      expect(view.text()).toContain('TN');
      expect(view.text()).toContain('12345');
    });

    it('shows the cap rate', function () {
      expect(view.text()).toContain('1.23%');
    });

    it('shows the number of units', function () {
      expect(view.text()).toContain('55');
    });

    it('shows the cost', function () {
      expect(view.text()).toContain('$1,000');
    });
  });

  describe('cap rate', function() {
    describe('when the cap rate returns a number', function() {
      it('displays the number', function() {
        spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue('1.23');

        view = this.render_template('<div rental-property-summary="summary">', this.$scope);
        this.$scope.$apply();

        expect(view).toContainText('1.23%');
      });
    });

    describe('when the cap rate does not return a number', function() {
      it('displays --', function() {
        spyOn(this.key_rent_ratios_service, 'get_cap_rate').and.returnValue(NaN);

        view = this.render_template('<div rental-property-summary="summary">', this.$scope);

        expect(view).toContainText('--');
        expect(view).not.toContainText('%');
      });
    });
  });
});
