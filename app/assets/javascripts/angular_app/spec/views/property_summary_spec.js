describe('a property summary', function() {
  var view;

  beforeEach(function() {
    this.inject_dependencies('$scope', 'render_template', 'key_rent_ratios_service');
    this.$scope.summary = {
      street: '123 Sesame Street',
      city: 'Bunville',
      state: 'TN',
      zip_code: '12345'
    }
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
