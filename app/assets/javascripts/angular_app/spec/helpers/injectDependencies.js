beforeEach(function() {
  var self = this;
  this.injectDependencies = function() {
    var dependencies = _.toArray(arguments);

    return inject(function($injector) {
      _.each(dependencies, function(dependency) {
        self[dependency] = $injector.get(dependency);
      });
    });
  };
});
