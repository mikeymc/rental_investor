describe('the properties list view', function() {
  var view;

  beforeEach(function() {
    this.inject_dependencies('$scope', 'render_template', '$httpBackend');
    this.$httpBackend.expectGET('/api/rental_properties').respond(200, [{}, {}]);
    view = this.render_template('investment_properties_pages/properties_list/rental_properties.html', this.$scope);
    this.$httpBackend.flush();
  });

  afterEach(function() {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('shows a list of properties', function() {
    expect(view.find('.rental-property-summary').length).toEqual(2);
  });

  describe('adding a new property', function() {
    it('has a "New Property" button', function() {
      expect(view.find('button:contains(New Property)')).toExist();
    });

    describe('clicking the "New Property" button', function() {
      it('shows a new row', function() {
        var original_number_of_rows = view.find('.rental-property-summary').length;

        view.find('button:contains(New Property)').click();

        expect(view.find('.rental-property-summary').length).toEqual(original_number_of_rows + 1);
      });

      describe('the "New Property" row', function() {
        beforeEach(function() {
          view.find('button:contains(New Property)').click();
        });

        it('has editable fields', function() {
          expect(view.find('#new-property-row input')).toExist();
          expect(view.find('#new-property-row input[name="new_property_street"]')).toExist();
          expect(view.find('#new-property-row input[name="new_property_city"]')).toExist();
          expect(view.find('#new-property-row input[name="new_property_state"]')).toExist();
          expect(view.find('#new-property-row input[name="new_property_zip"]')).toExist();
        });

        describe('clicking the save button', function() {
          it('makes a POST request to the properties API endpoint', function() {
            this.$httpBackend.expectPOST('/api/rental_properties').respond(200);

            view.find('button:contains(Create)').click();

            this.$httpBackend.flush();
          });

          it('closes the "New Property" row', function() {
            var original_number_of_rows = view.find('.rental-property-summary').length;
            this.$httpBackend.expectPOST('/api/rental_properties').respond(200, [{}, {}]);

            view.find('button:contains(Create)').click();
            this.$httpBackend.flush();

            expect(view.find('.rental-property-summary').length).toEqual(original_number_of_rows - 1);
          });
        });

        describe('clicking the cancel button', function() {
          it('makes the "New Property" row go away', function() {
            var original_number_of_rows = view.find('.rental-property-summary').length;

            view.find('button:contains(Cancel)').click();

            expect(view.find('.rental-property-summary').length).toEqual(original_number_of_rows - 1);
          });
        });
      });
    });

  })
});
