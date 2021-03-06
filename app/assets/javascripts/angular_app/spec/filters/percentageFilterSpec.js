describe('percentage', function() {
  var view;
  beforeEach(function() {
    this.injectDependencies('renderTemplate', '$scope', '$httpBackend');
  });

  describe('when interpolated in a view', function() {
    it('adds a % to text', function() {
      this.$scope.number = '15';
      view = this.renderTemplate('<div>{{number | percentage}}</div>', this.$scope);
      expect(view.find('div').text().trim()).toEqual('15%');
    });

    describe('decimals', function() {
      describe('when a user does not specify', function() {
        it('assumes zero decimals', function() {
          this.$scope.number = '15';
          view = this.renderTemplate('<div>{{number | percentage}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15%');
        });
      });

      describe('when a user specifies', function() {
        it('uses that many decimals', function() {
          this.$scope.number = '15';
          view = this.renderTemplate('<div>{{number | percentage:0}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15%');

          this.$scope.number = '15.1';
          view = this.renderTemplate('<div>{{number | percentage:0}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15%');

          this.$scope.number = '15.5';
          view = this.renderTemplate('<div>{{number | percentage:0}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('16%');

          this.$scope.number = '15.5';
          view = this.renderTemplate('<div>{{number | percentage:1}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15.5%');

          this.$scope.number = '15.5';
          view = this.renderTemplate('<div>{{number | percentage:2}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15.50%');

          this.$scope.number = '15.52';
          view = this.renderTemplate('<div>{{number | percentage:2}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15.52%');

          this.$scope.number = '15.52164902';
          view = this.renderTemplate('<div>{{number | percentage:2}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15.52%');

          this.$scope.number = '15.52164902';
          view = this.renderTemplate('<div>{{number | percentage:3}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('15.522%');

          this.$scope.number = '0';
          view = this.renderTemplate('<div>{{number | percentage:4}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('0.0000%');

          this.$scope.number = 0;
          view = this.renderTemplate('<div>{{number | percentage:4}}</div>', this.$scope);
          expect(view.find('div').text().trim()).toEqual('0.0000%');
        });
      });
    });
  });
});
