describe('irr_service', function() {
  var subject;

  beforeEach(function() {
    this.inject_dependencies('irr_service');
    subject = this.irr_service;
  });

  it('returns the internal rate of return', function() {
    var values = ['-61082.00', '72499'];
    var irr = subject.calculate_irr(values);
    expect(irr).toEqual('18.69');
  });
});
