describe('the new property dialog', function () {
  var view;

  beforeEach(function () {
    this.injectDependencies('$scope', '$rootScope', 'renderTemplate', 'propertyRepository');
  });

  describe('items on the dialog', function () {
    beforeEach(function() {
      view = this.renderTemplate('<new-property-modal/>', this.$scope);
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
      this.$scope.saveNewProperty = function () {};
      spyOn(this.$scope, 'saveNewProperty');

      view = this.renderTemplate('<new-property-modal create-property="saveNewProperty"/>', this.$scope);
      view.find('input[name=new_property_street]').val('123 Banana Street').trigger('input');
      view.find('input[name=new_property_city]').val('Fruitvale').trigger('input');
      view.find('input[name=new_property_state]').val('CA').trigger('input');
      view.find('input[name=new_property_zip]').val('12345').trigger('input');
      view.find('button:contains(Create)').click();

      expect(this.$scope.saveNewProperty).toHaveBeenCalledWith({
        street: '123 Banana Street',
        city: 'Fruitvale',
        state: 'CA',
        zipCode: '12345'
      });
    });
  });
});
