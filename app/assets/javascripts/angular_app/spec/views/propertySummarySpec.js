describe('a property summary', function() {
  var view;

  beforeEach(function() {
    this.injectDependencies('$scope', 'renderTemplate', 'keyRentRatiosService', 'propertyService', 'roiService');
    this.$scope.summary = fixtures.rentalProperties().rentalProperties[0];
    spyOn(this.propertyService, 'getTotalCost').and.returnValue('1000');
  });

  describe('the summary data that is shown', function () {
    var summary_row;

    beforeEach(function () {
      spyOn(this.keyRentRatiosService, 'getCapitalizationRate').and.returnValue('1.23');
      spyOn(this.roiService, 'getCashOnCashReturn').and.returnValue(['57.89', '12.22']);
      view = this.renderTemplate('<div rental-property-summary="summary">', this.$scope);
      summary_row = view.find('.rental-property-summary');
    });

    it('shows the address in the first 4 slots', function () {
      expect(summary_row.find('div:nth(0)').text().trim()).toEqual('421 Moroni Blvd');
      expect(summary_row.find('div:nth(1)').text().trim()).toEqual('Salt Lake City');
      expect(summary_row.find('div:nth(2)').text().trim()).toEqual('UT');
      expect(summary_row.find('div:nth(3)').text().trim()).toEqual('12345');
    });

    it('shows the number of units in the 5th slot', function () {
      expect(summary_row.find('div:nth(4)').text().trim()).toEqual('60');
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
      spyOn(this.roiService, 'getCashOnCashReturn').and.returnValue('7.89');
    });

    describe('when the cap rate returns a number', function() {
      it('displays the number', function() {
        spyOn(this.keyRentRatiosService, 'getCapitalizationRate').and.returnValue('1.23');

        view = this.renderTemplate('<div rental-property-summary="summary">', this.$scope);
        this.$scope.$apply();

        expect(view.find('div:nth(6)').text().trim()).toEqual('1.23%');
      });
    });

    describe('when the cap rate does not return a number', function() {
      it('displays --', function() {
        spyOn(this.keyRentRatiosService, 'getCapitalizationRate').and.returnValue(NaN);

        view = this.renderTemplate('<div rental-property-summary="summary">', this.$scope);

        expect(view.find('div:nth(6)').text().trim()).toEqual('--');
      });
    });
  });
});
