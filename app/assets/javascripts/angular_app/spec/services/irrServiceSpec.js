describe('irrService', function() {
  var subject;

  beforeEach(function() {
    this.inject_dependencies('irrService');
    subject = this.irrService;
  });

  it('returns the internal rate of return', function() {
    var values = ['-61082.00', '72499'];
    var irr = subject.calculateInternalRateOfReturn(values);
    expect(irr).toEqual('18.69');
  });
});
