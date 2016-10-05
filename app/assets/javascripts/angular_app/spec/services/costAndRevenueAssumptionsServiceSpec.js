describe('property_service', function() {
  var subject;

  beforeEach(function() {
    this.inject_dependencies('property_service');
    subject = this.property_service;
  });

  it('returns the sum of costs', function() {
    var val = subject.getClosingCosts({closing_cost: {a: 1, b: 2}});
    expect(val).toEqual(3);
  });

  it('ignores id and rental property ids', function() {
    var val = subject.getClosingCosts({closing_cost: {a: 1, b: 2, id: 17, rental_property_id: 44}});
    expect(val).toEqual(3);
  });

  it('does not change the input value', function() {
    var original = {closing_cost: {a: 1, b: 2, id: 17, rental_property_id: 44}};
    var copy = angular.copy(original);

    subject.getClosingCosts(original);

    expect(copy).toEqual(original);
  });
});
