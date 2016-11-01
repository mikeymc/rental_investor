describe('propertyService', function() {
  var subject;

  beforeEach(function() {
    this.injectDependencies('propertyService');
    subject = this.propertyService;
  });

  it('returns the sum of costs', function() {
    var val = subject.getClosingCosts({closingCost: {a: 1, b: 2}});
    expect(val).toEqual(3);
  });

  it('ignores id and rental property ids', function() {
    var val = subject.getClosingCosts({closingCost: {a: 1, b: 2, id: 17, rentalPropertyId: 44}});
    expect(val).toEqual(3);
  });

  it('does not change the input value', function() {
    var original = {closingCost: {a: 1, b: 2, id: 17, rentalPropertyId: 44}};
    var copy = angular.copy(original);

    subject.getClosingCosts(original);

    expect(copy).toEqual(original);
  });
});
