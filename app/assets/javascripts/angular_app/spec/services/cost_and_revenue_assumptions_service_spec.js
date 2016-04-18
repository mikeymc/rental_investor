describe('cost_and_revenue_assumptions_service', function() {
  var subject;

  beforeEach(function() {
    this.inject_dependencies('cost_and_revenue_assumptions_service');
    subject = this.cost_and_revenue_assumptions_service;
  });

  describe('when closing costs do not exist', function() {
    it('returns zero', function() {
      var val = subject.get_closing_costs();
      expect(val).toEqual(0);
    });
  });

  describe('when closing costs exist', function() {
    it('returns zero', function() {
      var val = subject.get_closing_costs({a: 1, b: 2});
      expect(val).toEqual(3);
    });

    it('ignores id and rental property ids', function() {
      var val = subject.get_closing_costs({a: 1, b: 2, id: 17, rental_property_id: 44});
      expect(val).toEqual(3);
    });

    it('does not change the input value', function() {
      var original = {a: 1, b: 2, id: 17, rental_property_id: 44};
      var copy = angular.copy(original);

      subject.get_closing_costs(original);

      expect(copy).toEqual(original);
    });
  });

});
