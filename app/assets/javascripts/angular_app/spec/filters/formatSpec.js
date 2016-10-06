describe('format', function() {
  var view;
  beforeEach(function() {
    this.injectDependencies('renderTemplate', '$scope');
  });

  describe('when just looking at an input value', function() {
    it('shows it formatted to specification', function() {
      this.$scope.numbers = {test_num: 15};
      view = this.renderTemplate('<input type="text" format="percentage" ng-model="numbers.test_num"></input>', this.$scope);

      expect(view.find('input').val()).toEqual('15%');
    });
  });

  describe('when focused on the input value', function() {
    beforeEach(function() {
      this.$scope.numbers = {test_num: 15};
      view = this.renderTemplate('<input type="text" format="percentage" ng-model="numbers.test_num"></input>', this.$scope);
      view.find('input').focus();
    });

    describe('before entering any new values', function() {
      it('keeps the formatting', function() {
        expect(view.find('input').val()).toEqual('15%');
      });
    });
  });
});
