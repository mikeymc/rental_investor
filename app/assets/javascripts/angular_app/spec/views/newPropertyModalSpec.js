describe('the new property dialog', function () {
  var view;

  beforeEach(function () {
    this.inject_dependencies('$scope', '$rootScope', 'render_template', 'propertyRepository');
  });

  describe('items on the dialog', function () {
    beforeEach(function() {
      view = this.render_template('<new-property-modal/>', this.$scope);
    });

    it('has a title', function () {
      expect(view).toContainText('New Property');
    });

    it('has a create button', function () {
      expect(view.find('button:contains(Create)')).toExist();
    });

    it('has a cancel button', function () {
      expect(view.find('button:contains(Cancel)')).toExist();
    });

    it('has an input for street, city, state, and zip code', function () {
      expect(view.find('input[name=new_property_street]')).toExist();
      expect(view.find('input[name=new_property_city]')).toExist();
      expect(view.find('input[name=new_property_state]')).toExist();
      expect(view.find('input[name=new_property_zip]')).toExist();
    });
  });

  describe('entering an address and hitting Create', function () {
    it('calls the callback that was passed in with the right input values', function () {
      this.$scope.save_new_property = function () {};
      spyOn(this.$scope, 'save_new_property');

      view = this.render_template('<new-property-modal create-property="save_new_property"/>', this.$scope);
      view.find('input[name=new_property_street]').val('123 Banana Street').trigger('input');
      view.find('input[name=new_property_city]').val('Fruitvale').trigger('input');
      view.find('input[name=new_property_state]').val('CA').trigger('input');
      view.find('input[name=new_property_zip]').val('12345').trigger('input');
      view.find('button:contains(Create)').click();

      expect(this.$scope.save_new_property).toHaveBeenCalledWith({
        street: '123 Banana Street',
        city: 'Fruitvale',
        state: 'CA',
        zip_code: '12345'
      });
    });
  });

  describe('clicking the cancel button', function () {
    it('calls the cancel callback', function () {
      this.$scope.cancel_callback = function () {};
      spyOn(this.$scope, 'cancel_callback');

      view = this.render_template('<new-property-modal cancel="cancel_callback"/>', this.$scope);
      view.find('button:contains(Cancel)').click();

      expect(this.$scope.cancel_callback).toHaveBeenCalled();
    });
  });
});
