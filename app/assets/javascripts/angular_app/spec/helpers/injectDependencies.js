beforeEach(function() {
  var self = this;
  this.inject_dependencies = function() {
    var dependencies = _.toArray(arguments);

    return inject(function($injector) {
      _.each(dependencies, function(dependency) {
        self[dependency] = $injector.get(dependency);
      });
    });
  };
});
