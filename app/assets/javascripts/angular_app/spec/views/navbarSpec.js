describe('the navbar', function() {
  var view;

  beforeEach(function() {
    this.injectDependencies('$scope', 'render_template', '$state', '$auth', '$q');
    spyOn(this.$auth, 'validateUser').and.returnValue(this.$q.when(true));
  });

  describe('the home link', function() {
    describe('when not on the properties list page', function() {
      beforeEach(function() {
        this.$state.go('financials', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);
      });

      it('shows a home link', function() {
        expect(view.find('a:contains(Home)')).toExist();
      });

      it('links back to the properties list', function() {
        expect(view.find('a:contains(Home)').attr('ui-sref')).toEqual('rental_properties');
      });
    });

    describe('when on the properties list page', function() {
      it('does not show a home link', function() {
        this.$state.current.name = 'rental_properties';

        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Home)')).not.toExist();
      });
    });
  });

  describe('the property address', function() {
    describe('when a property exists', function() {
      it('shows the property address', function() {
        this.$scope.rental_property = {
          street: '12345 Banana St',
          city: 'Fruitvale',
          state: 'CA',
          zip_code: '09876'
        };

        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('.property-address')).toContainText('12345 Banana St, Fruitvale, CA 09876');
      })
    });

    describe('when a property does not exist', function() {
      it('shows the property address', function() {
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('.property-address')).not.toExist();
      })
    });
  });

  describe('the financials link', function() {
    describe('when on the properties list page', function() {
      it('does not show the link', function() {
        this.$state.go('rental_properties');
        view = this.render_template('<navbar/>', this.$scope);

        expect(view).not.toContainText('Financials');
      });
    });

    describe('when on the property page', function() {
      it('shows the link', function() {
        this.$state.go('financials', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Financials)')).toExist();
      });

      it('links to the financials', function() {
        this.$state.go('financials', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Financials)').attr('ui-sref')).toEqual('financials({rental_id: rental_property.id})');
      })
    });
  });

  describe('the questionnaire link', function() {
    describe('when on the properties list page', function() {
      it('does not show the link', function() {
        this.$state.go('rental_properties');
        view = this.render_template('<navbar/>', this.$scope);

        expect(view).not.toContainText('Questionnaire');
      });
    });

    describe('when on the property page', function() {
      it('shows the link', function() {
        this.$state.go('financials', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Questionnaire)')).toExist();
      });

      it('links to the questionnaire', function() {
        this.$state.go('financials', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Questionnaire)').attr('ui-sref')).toEqual('questionnaire({rental_id: rental_property.id})');
      })
    });

    describe('when on the questionnaire page', function() {
      it('shows the link', function() {
        this.$state.go('questionnaire', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Questionnaire)')).toExist();
      });

      it('links to the questionnaire', function() {
        this.$state.go('questionnaire', {rental_id: 1});
        view = this.render_template('<navbar/>', this.$scope);

        expect(view.find('a:contains(Questionnaire)').attr('ui-sref')).toEqual('questionnaire({rental_id: rental_property.id})');
      })
    });
  });
});
