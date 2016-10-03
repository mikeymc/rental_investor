describe('the new property dialog', function () {
  var view;

  beforeEach(function () {
    this.inject_dependencies('$scope', 'render_template', 'property_repository');
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
    beforeEach(function() {
      this.$scope.save_new_property = function () {};
      spyOn(this.$scope, 'save_new_property');

      view = this.render_template('<new-property-modal/>', this.$scope);
    });

    it('creates the property', function () {
      view.find('input[name=new_property_street]').val('street-address-value');
      view.find('input[name=new_property_city]').val('city-value');
      view.find('input[name=new_property_state]').val('state-value');
      view.find('input[name=new_property_zip]').val('zip-value');

      view.find('button:contains(Create)').click();

      expect(this.$scope.save_new_property).toHaveBeenCalled();
    });
  });
});
