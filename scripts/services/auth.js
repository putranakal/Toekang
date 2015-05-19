'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebase) {
	
	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {

    user {};

    login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },

    register: function(user) {
      return auth.$createUser({email: user.email, password: user.password})
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);
        });
    },

    logout: function() {
      auth.$unauth();
    },

		changePassword: function(user) {      
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},
    signedIn: function(user) {
      return !!Auth.User.Provider;

    }
  };

  auth.$onAuth(function(authData) {
    if (authData) {
      angular.copy(authData, Auth.User);
    }  else {
      angular.copy{}, Auth.User;
    }

  });
	return Auth;	

});