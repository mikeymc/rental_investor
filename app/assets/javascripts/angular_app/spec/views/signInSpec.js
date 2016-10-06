describe('signing in', function() {
  var view;

  beforeEach(function() {
    this.injectDependencies('$scope', 'renderTemplate', '$httpBackend');
  });

  afterEach(function() {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  describe('when a user enters a username and password and clicks "Sign In"', function() {
    beforeEach(function() {
      this.$httpBackend.expectPOST('/api/auth/sign_in').respond(200, {});
      view = this.renderTemplate('user_sessions/new.html', this.$scope);
      view.find('input[name=email]').val('bob@bob.com');
      view.find('input[name=password]').val('bobspassword');
      view.find('button:contains(Sign In)').click();
    });

    it('makes a request to the auth service', function() {
      this.$httpBackend.flush();
    });

    it('shows no error message', function() {
      this.$httpBackend.flush();
      expect(view).not.toContainText('Invalid login credentials. Please try again.');
    });
  });

  describe('when a user enters bad credentials and clicks "Sign In"', function() {
    it('makes a request to the auth service', function() {
      var error_response = {"errors": ["Invalid login credentials. Please try again."]};
      this.$httpBackend.expectPOST('/api/auth/sign_in').respond(401, error_response);
      view = this.renderTemplate('user_sessions/new.html', this.$scope);

      view.find('input[name=email]').val('bob@bob.com');
      view.find('input[name=password]').val('bobs-password');
      view.find('button:contains(Sign In)').click();

      this.$httpBackend.flush();

      expect(view).toContainText('Invalid login credentials. Please try again.');
    });
  });
});
